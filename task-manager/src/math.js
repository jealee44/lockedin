const calculateTip = (total, tipPercent = .25) => total + (total * tipPercent)

const fahrenheitToCelcius = (temp) => {
    return (temp - 32) / 1.8
}

const celciusToFahrenheight = (temp) => {
    return (temp * 1.8) + 32
}
 
module.exports = { 
    calculateTip,
    fahrenheitToCelcius,
    celciusToFahrenheight
}