import { LineChart } from "../../libs/mui";

import { MONTHS } from "../../constants";

export const Line = ({ title, data = [] }) => {
    return (
        <div className="chart">
            <div className="page__label">{title}</div>

            <LineChart
                xAxis={[
                    {
                        scaleType:'band',
                        data: MONTHS
                    }
                ]}
                series={[
                    {
                        data: data,
                        area: true,
                    }
                ]}
                grid={{
                    vertical:true,
                    horizontal:true
                }}
                height={300}
                width={600}
            />
        </div>
    );
};