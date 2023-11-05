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

module.exports = calculatePercentChange;