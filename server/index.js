const express = require("express");
const cors = require("cors");
const axios = require("axios");
const PORT = 4000;
const bodyParser = require("body-parser");
const calculatePercentChange = require("./middleware/calculatePercentChange");
const handlingChartData = require("./middleware/handlingChartData");
const calculateRSI = require("./middleware/calculateRSI");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.get("/current-price", async (req, res) => {
  // send API request
  const cryptoPriceRequest = await axios.get("https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=" + req.query.cryptocurrency + "&market=USD&apikey=HPAAG9C5EA47K81B");
  res.send( await calculatePercentChange(cryptoPriceRequest.data["Time Series (Digital Currency Daily)"]));
});

app.get("/crypto-price-data", async (req, res) => {
  // cryptocurrency sent in the query of the request instead of the body - because of errors occurred and because there is no security concerns
  const cryptoPriceRequest = await axios.get("https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol=" + req.query.cryptocurrency + "&market=USD&apikey=" + process.env.ALPHA_VANTAGE_API_KEY);

  getPriceHistory(cryptoPriceRequest.data["Time Series (Digital Currency Weekly)"]);
  res.send(cryptoPriceRequest.data);
});

app.get("/price-history", async (req, res) => {
  const cryptoPriceRequest = await axios.get("https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=" + req.query.cryptocurrency + "&market=USD&apikey=" + process.env.ALPHA_VANTAGE_API_KEY);
  res.send( await handlingChartData(cryptoPriceRequest.data));
});

// THERE IS AN ERROR WITH CALCULATING RSI
app.get("/calculate-rsi", async(req,res) =>{
  const cryptoPriceRequest = await axios.get("https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=" + req.query.cryptocurrency + "&market=USD&apikey=" + process.env.ALPHA_VANTAGE_API_KEY);
  res.send(await calculateRSI(cryptoPriceRequest.data));
});

console.log(process.env.COINAPI_API_KEY);

app.post("/calculate-sma", async(req, res) => {
  const cryptoPriceResult = await axios.get("https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_" + req.body.cryptocurrency + "_USD/history?apikey=" + process.env.COINAPI_API_KEY +"&period_id=1DAY&limit=360");
  const currentPrice = cryptoPriceResult.data[0]["price_close"];

  let simpleMovingAverage = {};
  let counter = 0;
  let total = 0;
  let tupleObject = {};
  let elementCounter = 1;
  for (let i = 0; i < 100; i++){

    total += parseFloat(cryptoPriceResult.data[i]["price_close"]);
    counter += 1

    if (counter == 1){
      tupleObject["Price Date"] = cryptoPriceResult.data[i]["time_period_start"];
    }else if(counter == 5){
      let movingAverage = total / 5;
      tupleObject["Moving Average"] = movingAverage;
      simpleMovingAverage[elementCounter] = tupleObject;

      tupleObject = {};
      counter = 0;
      total = 0;
      elementCounter += 1;
    }

    console.log(cryptoPriceResult.data[i]["price_close"]);

  }
  console.log(simpleMovingAverage);
  res.send({
    "Current Price": currentPrice
  });
});

app.listen(PORT, function(){
    console.log("Server running on PORT " + PORT + "...");
});