import React, {useState} from "react";
import axios from "axios";

function SearchCrypto(){
    const [userInput, setUserInput] = useState();
    const [cryptoPriceInfo, setCryptoPriceInfo] = useState();

    // the event passed into the handleChange function is the event is a change in the text input field
    function handleChange(event){
        console.log("someone is typing an input in the text box");
        setUserInput(event.target.value);
        console.log("this should be the user input " + userInput);
    }

    async function handleButtonClick(){
        document.getElementById("hiddenElement").removeAttribute("hidden");
        const requestBodyData = {
            cryptocurrency: "BTC"
        };

        const requestResult = await axios.get("http://localhost:4000/crypto-price-data", { params: requestBodyData });

        console.log(requestResult.data);
        setCryptoPriceInfo(requestResult.data);
    }

    return (
        <div>
            <input type="text" onChange={handleChange} value={userInput}></input>
            <button onClick={ handleButtonClick }>Search Cryptocurrency</button>
            <p>Allow the user to search for a crypto here</p>
            <p id="hiddenElement" hidden>this should be the user input { cryptoPriceInfo } </p>
        </div>
    )
}

export default SearchCrypto;