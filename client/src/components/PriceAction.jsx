import React from "react";
import { Line } from "react-chartjs-2";

function PriceAction(props){
    const data = {
        labels: props.fullGraphLabel,
        datasets: [
            {
                borderColor: 'rgba(0, 255, 24, 1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                data: props.fullPriceAction,
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

export default PriceAction;