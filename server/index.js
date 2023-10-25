const express = require("express");
const cors = require("cors");
const axios = require("axios");
const PORT = 4000;
const bodyParser = require("body-parser");
const e = require("express");

const app = express();

app.use(cors());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());



async function calculatePercentChange(priceData){
  // convert the object returned to an object that can be iterated over
  const priceDataIterable = Object.entries(priceData);
  // get the price difference over the last week
  // data handling
  const currentClosePrice = priceDataIterable[0][1]["4b. close (USD)"];
  const currentPriceDate = priceDataIterable[0][0];
  const previousClosePrice = priceDataIterable[6][1]["4b. close (USD)"];
  const previousPriceDate = priceDataIterable[6][0];

  const pricePercentChange = 100 * ((currentClosePrice - previousClosePrice) / previousClosePrice);
  
  return {
    "Current Close Price": currentClosePrice,
    "Current Price Date": currentPriceDate,
    "Previous Close Price": previousClosePrice,
    "Previous Price Date": previousPriceDate,
    "Price Percent Change": pricePercentChange
  };
}

app.get("/current-price", async (req, res) => {
  const cryptoPriceRequest = await axios.get("https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=" + req.query.cryptocurrency + "&market=USD&apikey=HPAAG9C5EA47K81B");
  res.send( await calculatePercentChange(cryptoPriceRequest.data["Time Series (Digital Currency Daily)"]));
});

app.get("/crypto-price-data", async (req, res) => {
  // cryptocurrency sent in the query of the request instead of the body - because of errors occurred and because there is no security concerns
  const cryptoPriceRequest = await axios.get("https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol=" + req.query.cryptocurrency + "&market=USD&apikey=" + process.env.ALPHA_VANTAGE_API_KEY);

  getPriceHistory(cryptoPriceRequest.data["Time Series (Digital Currency Weekly)"]);
  res.send(cryptoPriceRequest.data);
});

async function handlingChartData(priceData){
  const priceAction = priceData["Time Series (Digital Currency Daily)"];
  const priceActionIterable = Object.entries(priceAction);
  let label = [];
  let price = [];
  for (let i = 0; i < 14; i++){
    label.push(priceActionIterable[i][0]);
    price.push(priceActionIterable[i][1]["4a. close (USD)"]);
  }

  return [label, price];
}

app.get("/price-history", async (req, res) => {
  const cryptoPriceRequest = await axios.get("https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=" + req.query.cryptocurrency + "&market=USD&apikey=" + process.env.ALPHA_VANTAGE_API_KEY);
  res.send( await handlingChartData(cryptoPriceRequest.data));
});

async function calculateRSI(priceData){
  const cryptoPriceData = priceData["Time Series (Digital Currency Daily)"];
  const cryptoPriceDataIterable = Object.entries(cryptoPriceData);
  let closePriceAction = [];
  for (let i = 0; i < 7; i++){
    closePriceAction.push(cryptoPriceDataIterable[i][1]["4a. close (USD)"]);
  }
  let priceChange = [];
  let j = 1;
  let gain = [];
  let loss = [];
  for (let i = 0;i < 6; i++){
    const priceChangeDaily = closePriceAction[i] - closePriceAction[j];
    priceChange.push(priceChangeDaily);
    j++;
    if (priceChangeDaily > 0){
      gain.push(priceChangeDaily);
    }else if(priceChangeDaily < 0){
      loss.push(priceChangeDaily);
    }
  }
  // the price change array is the daily price action
  let totalGain = 0;
  let totalLoss = 0;

  for(let i = 0; i < gain.length; i++){
    totalGain += gain[i];
  }

  for(let i = 0; i < loss.length; i++){
    totalLoss += loss[i];
  }

  let averageGain = totalGain / gain.length;
  let averageLoss = totalLoss / loss.length;

  let relativeStrength;
  if (averageLoss == 0){
    // account for an error that will occur on a zero division
    relativeStrength = 0;
  }else{
    relativeStrength = averageGain / averageLoss;
  }
  let relativeStrengthIndex =  100 - (100 / (1 + relativeStrength))
  return {"Relative Strength Index": relativeStrengthIndex};
}

app.get("/calculate-rsi", async(req,res) =>{
  const cryptoPriceRequest = await axios.get("https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=" + req.query.cryptocurrency + "&market=USD&apikey=" + process.env.ALPHA_VANTAGE_API_KEY);
  res.send(await calculateRSI(cryptoPriceRequest.data));
});

app.listen(PORT, function(){
    console.log("Server running on PORT " + PORT + "...");
});