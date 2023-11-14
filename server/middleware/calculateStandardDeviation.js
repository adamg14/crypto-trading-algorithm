function calculateStandardDeviation(marketData){
    let sum = 0;
    // marketData parameter is an array of close prices
    for (let i = 0; i < marketData.length; i++){
        sum += parseFloat(marketData[i]);
    }


    // calculate the mean close prices over this range
    let mean = sum / marketData.length;

    // calculate the deviation from the mean of each close price items squared
    let deviationsSquared = [];
    for (let i = 0; i < marketData.length; i++){
        deviationsSquared.push(
            ((parseFloat(marketData[i]) - mean) ** 2)
        );
    }
    
    // calculate the mean of the squared deviations
    let sumSquaredDeviations = 0;
    for (let i = 0; i < deviationsSquared.length; i++){
        sumSquaredDeviations += deviationsSquared[i]
    }

    let meanSquaredDeviation = sumSquaredDeviations / deviationsSquared.length;
    // standard deviation is the square root of this value
    // square root is the same as the power of a half - round this to two decimal places
    return (meanSquaredDeviation ** 0.5).toFixed(2);
}

console.log(calculateStandardDeviation([50, 52, 48, 55, 60]));
module.exports = calculateStandardDeviation;