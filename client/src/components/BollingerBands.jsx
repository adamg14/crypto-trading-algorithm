import React from "react";
import { Line } from "react-chartjs-2";

function BollingerBands(props){
    const data = {
        labels: props.graphLabel,
        datasets: [
            {
              label: 'Simple Moving Average',
              borderColor: 'rgba(252, 239, 0, 1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
              data: props.simpleMovingAverage,
            },
            {
              label: 'Lower Band',
              borderColor: 'rgba(255, 0, 0, 1)',
              backgroundColor: 'rgba(255, 0, 0, 0.2)',
              data: props.lowerBand,
            },
            {
                label: "Upper Band",
                borderColor: 'rgba(13, 255, 0, 1)',
                backgroundColor: 'rgba(13, 255, 0, 0.2)',
                data: props.upperBand,
            }
        ]
    };

    const options = {
        plugins: {
            legend: {
                display: true,
                position: "top",
                labels: {
                    color: "rgb(255, 99, 132)"
                }
            }
        }
    }

    return (
        <Line data={ data } options={ options }></Line>
    )
}

export default BollingerBands;
