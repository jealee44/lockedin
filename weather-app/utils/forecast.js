const request = require('request')

const forecast = (latitude, longitude, callback) => {
const url = 'https://api.weatherstack.com/current?access_key=6373a604c1ae2a8c693a47e1f47c0c6c&query=' + latitude + ',' + longitude + '&units=f'

    request({url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, {
            weather: body.current.weather_descriptions[0],
            temperature: body.current.temperature,
            feelslike: body.current.feelslike
        })
        }
    })
}

module.exports = forecast