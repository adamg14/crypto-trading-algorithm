const express = require("express");
const cors = require("cors");
const axios = require("axios");
const PORT = 4000;
const bodyParser = require("body-parser");
const calculatePercentChange = require("./middleware/calculatePercentChange");
const handlingChartData = require("./middleware/handlingChartData");
const calculateRSI = require("./middleware/calculateRSI");
const app = express();

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

app.listen(PORT, function(){
    console.log("Server running on PORT " + PORT + "...");
});