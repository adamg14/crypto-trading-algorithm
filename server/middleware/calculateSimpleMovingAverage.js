function calculateSimpleMovingAverage(priceData){
    // price data is an array of close prices
    let sum = 0;

    for (let i = 0; i < priceData.length; i++){
        sum += priceData[i];
    }

    const simpleMovingAverage = (sum/priceData.length);

    return simpleMovingAverage;
}

module.exports = calculateSimpleMovingAverage;