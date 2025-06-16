const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// const url = 'https://api.weatherstack.com/current?access_key=6373a604c1ae2a8c693a47e1f47c0c6c&query=37.8267,-122.4233&units=f'

// request({url: url, json: true}, (error, response) => {
//     // console.log(response.body.current) // didnt have to use JSON.parse(response.body) because of json:true built into request
//     if (error) {
//         console.log('unable to connect to weather service')
//     } else if (response.body.error){
//         console.log('unable to find location')
//     }
//     else {
//         console.log(response.body.current.weather_descriptions[0] + ` It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike}.`)
//     }
// })



geocode('Boston', (error, data) => {
    if (error) {
        return console.log(error)
    }

    forecast(data.latitude, data.longitude, (error, forecastData) => {
        if (error) {
            return console.log(error)
        }

        console.log(data.location)
        console.log(forecastData)
})
})

