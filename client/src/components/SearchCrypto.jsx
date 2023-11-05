import React, {useState} from "react";
import axios from "axios";
import PriceData from "./PriceData";
import CryptoPriceChart from "./CryptoPriceChart";
import RSI from "./RSI";

function SearchCrypto(){
    const [userInput, setUserInput] = useState();
    const [cryptoPriceInfo, setCryptoPriceInfo] = useState();
    const [priceData, setPriceData] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [currentClosePrice, setCurrentClosePrice] = useState();
    const [currentPriceDate, setCurrentPriceDate] = useState();
    const [previousClosePrice, setPreviousClosePrice] = useState();
    const [previousPriceDate, setPreviousPriceDate] = useState();
    const [pricePercentChange, setPricePercentChange] = useState();
    const [labels, setLabels] = useState();
    const [priceHistory, setPriceHistory] = useState();
    const [RSIValue, setRSIValue] = useState();

    // the event passed into the handleChange function is the event is a change in the text input field
    function handleChange(event){
        console.log("someone is typing an input in the text box");
        setUserInput(event.target.value);
        console.log("this should be the user input " + userInput);
        document.getElementById("priceData").setAttribute("hidden", true);
        document.getElementById("priceChart").setAttribute("hidden", true);
    }

    async function handleButtonClick(){
        console.log("button clicked");
        const getRequestParameters = {
            cryptocurrency: userInput
        };
        const cryptoPriceData = (await axios.get("http://localhost:4000/current-price", {params: getRequestParameters})).data;

        setCurrentClosePrice(cryptoPriceData["Current Close Price"]);
        setCurrentPriceDate(cryptoPriceData["Current Price Date"]);
        setPreviousClosePrice(cryptoPriceData["Previous Close Price"]);
        setPreviousPriceDate(cryptoPriceData["Previous Price Date"]);
        setPricePercentChange(cryptoPriceData["Price Percent Change"]);

        const cryptoPriceChart = (await axios.get("http://localhost:4000/price-history", {params: getRequestParameters})).data;
        
        setLabels(cryptoPriceChart[0]);
        setPriceHistory(cryptoPriceChart[1]);

        document.getElementById("priceData").removeAttribute("hidden");
        document.getElementById("priceChart").removeAttribute("hidden");

        const RSIRequest = (await axios.get("http://localhost:4000/calculate-rsi", {params: getRequestParameters})).data;
        setRSIValue(RSIRequest["Relative Strength Index"]);
        document.getElementById("RSI").removeAttribute("hidden");
    }

    return (
        <div>
            <input type="text" onChange={handleChange} value={userInput}></input>
            <button onClick={ handleButtonClick }>Search Cryptocurrency</button>
            <p>Allow the user to search for a crypto here</p>
            <p id="hiddenElement" hidden>this should be the user input { cryptoPriceInfo } </p>
            <p id="errorMessage">{ errorMessage }</p>
            <div id="priceData" hidden>
                <hr />
                <PriceData crypto={ userInput } currentPrice={ currentClosePrice } currentDate={ currentPriceDate } previousPrice = { previousClosePrice } previousDate={ previousPriceDate } percentChange={ pricePercentChange }></PriceData>
                <hr />
            </div>
            <div id="RSI" hidden>
                <RSI RSIValue={ RSIValue }></RSI>
            </div>
            <div id="priceChart" hidden>
                <CryptoPriceChart chartLabels={ labels } chartPriceData={ priceHistory }></CryptoPriceChart>
            </div>
        </div>
    )
}

export default SearchCrypto;