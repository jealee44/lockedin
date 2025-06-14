const request = require('request')

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


const mapUrl = 'https://api.mapbox.com/search/geocode/v6/forward?q=Los%20Angeles&access_token=pk.eyJ1IjoiamVhbGVlNDQiLCJhIjoiY21idm9wb2Q5MGc2bDJtb3M4dmlwdzZjNCJ9.e6usXadXOHqIPfN6N6745A'


request({url: mapUrl, json: true}, (error, response) => {

    if (error) {
        console.log('unable to connect to location services')
    } else if (response.body.features.length === 0) {
        console.log('unable to find location')
    } else {
        const latitude = response.body.features[0].properties.coordinates.latitude
        const longitude = response.body.features[0].properties.coordinates.longitude
        console.log(latitude, longitude)
    }
})