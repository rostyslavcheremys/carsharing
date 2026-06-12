import { PieChart } from "../../libs/mui";

export const Pie = ({
                        title,
                        data,
                        nameKey = "label",
                        valueKey = "value",
                    }) => {
    const pieChartData = data.map((item, index) => ({
        id: index,
        value: item[valueKey],
        label: item[nameKey],
    }));

    return (
        <div className="chart">
            <div className="page__label">{title}</div>

            <PieChart
                series={[
                    {
                        data: pieChartData,
                        arcLabel: (item) => `${item.value}`,
                        arcLabelMinAngle: 15,
                        innerRadius: 80,
                    }
                ]}
                width={300}
            />
        </div>
    );
};