function getDate(){
    const date = new Date();
    const year = date.getFullYear();
    // months days are 0 based
    let month = String(date.getMonth() + 1);
    if (month.length === 1){
        month = "0" + month;
    }

    let day = String(date.getDate());

    return (year + "-" + month + "-" + day);
}

console.log(getDate());

module.exports = getDate;