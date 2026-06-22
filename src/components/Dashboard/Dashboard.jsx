import { Pie, Line, Bar } from "../../components";

export const Dashboard = ({ cars, bookings, trips }) => {
    const availableCarsCount = cars?.filter(car => car.status === "available").length || 0;
    const rentedCarsCount = cars?.filter(car => car.status === "rented").length || 0;
    const unavailableCarsCount = cars?.filter(car => car.status === "unavailable").length || 0;

    const bookingsPerMonth = Array(12).fill(0);

    bookings?.forEach(booking=>{
        const date = booking.createdAt?.toDate();

        if (!date) return;

        const month = date.getMonth();

        bookingsPerMonth[month]++;
    });

    const tripsPerMonth = Array(12).fill(0);

    trips?.forEach((trip) => {
        const date = trip.actualStart?.toDate();

        if (!date) return;

        const month = date.getMonth();

        tripsPerMonth[month]++;
    });

    const bookingsByDay = Array(7).fill(0);

    const now = new Date();

    const firstDayOfWeek = new Date(now);
    firstDayOfWeek.setDate(
        now.getDate() - ((now.getDay() + 6) % 7)
    );
    firstDayOfWeek.setHours(0,0,0,0);

    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 7);

    bookings?.forEach((booking) => {
        if (booking.status !== "confirmed") return;

        const date = booking.plannedStart?.toDate?.();

        if (!date) return;

        if (date < firstDayOfWeek || date >= lastDayOfWeek) return;

        const day = (date.getDay() + 6) % 7;

        bookingsByDay[day]++;
    });

    return (
        <div className="dashboard">
            <Pie
                title="Автомобілі"
                data={[
                    {
                        label:'Доступні',
                        value:availableCarsCount
                    },
                    {
                        label:'Заброньовані',
                        value:rentedCarsCount
                    },
                    {
                        label:'Неактивні',
                        value:unavailableCarsCount
                    }
                ]}
            />

            <Line
                title="Кількість бронювань"
                data={bookingsPerMonth}
            />

            <Bar
                title="Заплановані поїздки"
                data={bookingsByDay}
            />

            <Line
                title="Кількість поїздок"
                data={tripsPerMonth}
            />
        </div>
    );
}