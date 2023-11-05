import React, { useState } from "react";

function RSI(props){
    // DO AN IF STATEMENT DEPENDING ON THE RSI VALUE RETURN A SPECIFIC VALUE

    return (
        <div>
            <h1>RSI</h1>
            <p>RSI is the Relative Strength Indicator, which is a trading indicator that shows the price strength and inference can be made from this indicator</p>
            <p>{ props.RSIValue}</p>
            <hr />
        </div>
        
    )
}

export default RSI;
