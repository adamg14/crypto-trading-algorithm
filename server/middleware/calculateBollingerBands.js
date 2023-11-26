const calculateSimpleMovingAverage = require("./calculateSimpleMovingAverage");
const calculateStandardDeviation = require("./calculateStandardDeviation");
const axios = require("axios");

async function calculateBollingerBands(req, res){
  const cryptoPriceResult = await axios.get("https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_" + req.body.cryptocurrency + "_USD/history?apikey=" + process.env.COINAPI_API_KEY +"&period_id=1DAY&limit=360");

  let priceData = [];
  let dateGraphLabel = [];
  let simpleMovingAverage = [];
  let upperBand = [];
  let lowerBand = [];
  let fullDateGraphLabel = [];
  let fullPriceData = [];
  for (let i = 0; i < 100 ;i++){
    priceData.push(cryptoPriceResult.data[i]["price_close"]);
    fullPriceData.push(cryptoPriceResult.data[i]["price_close"]);
    fullDateGraphLabel.push(cryptoPriceResult.data[i]["time_period_start"].slice(0, 10));
    if (priceData.length == 5){
      const movingAverage = calculateSimpleMovingAverage(priceData);
      simpleMovingAverage.push(movingAverage);

      const standardDeviation = calculateStandardDeviation(priceData);

      // calculate upper band
      upperBand.push(
        movingAverage + (2 * standardDeviation)
      );

      lowerBand.push(
        movingAverage - (2 * standardDeviation)
      );
      
      // calculate lower band
      console.log(standardDeviation);
      priceData = [];
    }else if(priceData.length == 1){
      dateGraphLabel.push(cryptoPriceResult.data[i]["time_period_start"].slice(0, 10));
    }
  }

  res.send({
    "Graph Date Label": dateGraphLabel,
    "Simple Moving Average": simpleMovingAverage,
    "Upper Bollinger Band": upperBand,
    "Lower Bollinger Band": lowerBand,
    "Full Graph Label": fullDateGraphLabel,
    "Full Price Data": fullPriceData
  });
}

module.exports = calculateBollingerBands;