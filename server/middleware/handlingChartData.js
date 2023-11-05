async function handlingChartData(priceData){
    const priceAction = priceData["Time Series (Digital Currency Daily)"];
    const priceActionIterable = Object.entries(priceAction);
    let label = [];
    let price = [];
    for (let i = 0; i < 30; i++){
      label.push(priceActionIterable[i][0]);
      price.push(priceActionIterable[i][1]["4a. close (USD)"]);
    }

    // reverse the arrays so that they are in ascending order of date
    return [label.reverse(), price.reverse()];
}

module.exports = handlingChartData;