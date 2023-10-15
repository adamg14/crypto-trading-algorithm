import React from "react";

function PriceData(props){
    return (
        <div>
            <h1>$ {props.crypto} Price Data</h1>
            <p>{ props.currentDate }: ${ props.currentPrice }</p>
            <p>{ props.previousDate }: ${ props.previousPrice}</p>
            <p>PERCENT CHANGE: {props.percentChange}%</p>
            <p>Negative price action suggests sellers are pushing the price down and could be an opportunity in the martket to buy.</p>
            <p>Neutral price actions *percentages close to zero on either side* suggests price consolidation which could result in a break out *extreme price action* in either direction.</p>
            <p>Positive price action suggest buyers are pushing the price up and could be an opportunity in the market to sell.</p>
        </div>
    );
}

export default PriceData;