import { useQuery } from "react-query";
import {useOutletContext} from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps{
    coinId: string;
}

interface IHistorical {
    time_open: string; 
    time_close: string;
    open: number; 
    high: number;
    low: number; 
    close: number; 
    volume: number; 
    market_cap: number; 
}


function Chart() {
    const { coinId } = useOutletContext<ChartProps>();
    const {isLoading, data} = useQuery<IHistorical[]>(["chart", coinId], () => fetchCoinHistory(coinId))

    return <div>{isLoading ? "Loading chart..." : 
    <ApexChart 
        type="line" 
        series={[
            {
                name: "price",
                data: data?.map((price) => price.close) as number[],
            }
        ]}
        options={{
            chart: {
                height: 500,
                width: 500,
                background: "transparent",
            },
            grid: {show: false},
            stroke: {
                curve : "smooth",
                width: 2,
            },
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                labels: {show: false},
                type: "datetime",
                categories: data?.map((price) => price.time_close),
            },
            fill: {
                type: "gradient",
                gradient: {gradientToColors: ['#0be881'], stops: [0, 100]},
            },
            colors: ['#0fbcf9'],
            tooltip: {
                y: {
                    formatter: (value) => `$ ${value.toFixed(3)}`
                }
            }
        }}
    />}</div> 
}

export default Chart;