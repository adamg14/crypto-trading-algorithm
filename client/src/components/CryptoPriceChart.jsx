import React from "react";
import { Line } from "react-chartjs-2";
import {Chart as Chartjs, LineElement, CategoryScale, LinearScale, PointElement} from "chart.js";

Chartjs.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
);

function CryptoPriceChart(props){
    const chartData = {
        labels: props.chartLabels,
        datasets: [
            {
                labels: "Sales of the week",
                data: props.chartPriceData,
                backgroundColor: "black",
                borderColor: "green"
            }
        ]
    };
    const chartOptions = {
        plugins: {
            legend: true
        }
    };
    return (
        <div>
            <Line data={ chartData } options={ chartOptions }>
            </Line>
        </div>
    )
}

export default CryptoPriceChart;