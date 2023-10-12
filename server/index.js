const express = require("express");
const cors = require("cors");
const axios = require("axios");
const PORT = 4000;
const bodyParser = require("body-parser");

const app = express();

app.use(cors());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/crypto-price-data", async (req, res) => {
  // cryptocurrency sent in the query of the request instead of the body - because of errors occurred and because there is no security concerns
  const cryptoPriceRequest = await axios.get("https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol=" + req.query.cryptocurrency + "&market=USD&apikey=HPAAG9C5EA47K81B");

  res.send(cryptoPriceRequest.data);
});

app.listen(PORT, function(){
    console.log("Server running on PORT " + PORT + "...");
});