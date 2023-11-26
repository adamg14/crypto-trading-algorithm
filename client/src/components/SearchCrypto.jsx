import React, {useState} from "react";
import BollingerBands from "./BollingerBands";
import Axios from "axios";

function SearchCrypto(){
    const [userInput, setUserInput] = useState();
    const [graphLabel, setGraphLabel] = useState(); 
    const [lowerBand, setLowerBand] = useState();
    const [upperBand, setUpperBand] = useState();
    const [simpleMovingAverage, setSimpleMovingAverage] = useState();
    // the event passed into the handleChange function is the event is a change in the text input field
    function handleChange(event){
        document.getElementById("bollinger-bands").setAttribute("hidden", true)
        console.log("someone is typing an input in the text box");
        setUserInput(event.target.value);
    }

    async function handleButtonClick(){
        // send the axios request for the bollinger band deails
        const url = "http://localhost:4000/calculate-bollinger-bands";
        const data = {
            cryptocurrency: userInput
        };

        const graphData = await Axios.post(url, new URLSearchParams(data).toString(),{
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        console.log(graphData.data);
        if("Graph Date Label" in graphData.data){
            // pass the bollinger band details to the props attribute
        setGraphLabel(graphData.data["Graph Date Label"]);
        setLowerBand(graphData.data["Lower Bollinger Band"]);
        setUpperBand(graphData.data["Upper Bollinger Band"]);
        setSimpleMovingAverage(graphData.data["Simple Moving Average"]);
        // remove the hidden attribute from the bollinger band
        document.getElementById("bollinger-bands").removeAttribute("hidden");
        // the graph data should be shown 
        }else{
            console.log("Invalid API request. API has not returned data");
        }
    }

    return (
        <div>
            <input type="text" onChange={handleChange} value={userInput}></input>
            <button onClick={ handleButtonClick }>Search Cryptocurrency</button>
            
            <div hidden id="bollinger-bands">
                <h1>Bollinger Bands</h1>
                <p>Middle Band: Simple Moving Average</p>
                <p>Upper Band: 5-day SMA + (5-day standard deviation * 2)</p>
                <p>Lower Band: 5-day SMA - (5-day standard deviation * 2)</p>

                <p>If middle band is closer to the lower band, this indicates the commodity is being oversold and could indicate a price increase in the future.</p>
                <p>If the middle band is closer to the upper band, this indicates the commodity is being overbought and could indicate a price decrease in the future.</p>
                <BollingerBands className="bollinger-bands" id="bollinger-bands" upperBand={ upperBand } lowerBand={ lowerBand } simpleMovingAverage={ simpleMovingAverage } graphLabel={ graphLabel }></BollingerBands>
            </div>
        </div>
    )
}

export default SearchCrypto;