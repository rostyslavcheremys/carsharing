import { useCollection } from "../../../hooks";
import { Loader, Dashboard }  from "../../../components";

export const DashboardPage = () => {
    const {
        data: cars,
        isLoading: isLoadingCars,
        error: errorCars,
    } = useCollection("cars");

    const {
        data: bookings,
        isLoading: isLoadingBookings,
        error: errorBookings
    } = useCollection("bookings");

    const {
        data: trips,
        isLoading: isLoadingTrips,
        error: errorTrips
    } = useCollection("trips");

    return (
        <Loader
            isLoading={isLoadingCars || isLoadingBookings || isLoadingTrips}
            error={errorCars || errorBookings || errorTrips}
        >
            <div className="page page__content">
                <span className="page__title">Інформаційна панель</span>

                <Dashboard
                    cars={cars}
                    bookings={bookings}
                    trips={trips}
                />
            </div>
        </Loader>
    );
}