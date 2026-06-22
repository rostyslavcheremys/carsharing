import { BarChart } from "../../libs/mui";

import { DAYS } from "../../constants";

export const Bar = ({ title, data = [] }) => {
    return (
        <div className="chart">
            <div className="page__label">{title}</div>

            <BarChart
                xAxis={[
                    {
                        scaleType:'band',
                        data: DAYS
                    }
                ]}
                series={[
                    {
                        data: data,
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