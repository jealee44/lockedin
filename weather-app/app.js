const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const address = process.argv[2]
// console.log(process.argv) //gives us an array and the 3rd index shows the first argument pass after script name 

if (!address) {
    console.log('Please provide an address!')
} else {
geocode(address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
        return console.log(error)
    }

    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return console.log(error)
        }

        console.log(location)
        console.log(forecastData)
})
})
}