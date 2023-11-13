import React, {useState} from "react";


function SearchCrypto(){
    const [userInput, setUserInput] = useState();

    // the event passed into the handleChange function is the event is a change in the text input field
    function handleChange(event){

        console.log("someone is typing an input in the text box");
        setUserInput(event.target.value);
    }

    async function handleButtonClick(){
        
    }

    return (
        <div>
            <input type="text" onChange={handleChange} value={userInput}></input>
            <button onClick={ handleButtonClick }>Search Cryptocurrency</button>
        </div>
    )
}

export default SearchCrypto;