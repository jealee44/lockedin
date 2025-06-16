const request = require('request')
const { geocode, forecast } = require('./utils/geocode')


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
    console.log('Error', error)
    console.log('Data', data)
})



//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)



forecast(44.1545, -75.7088, (error, data) => {
  console.log('Error', error)
  console.log('Data', data)
})