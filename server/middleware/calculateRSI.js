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

module.exports = calculateRSI;