const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(address) + '&access_token=pk.eyJ1IjoiamVhbGVlNDQiLCJhIjoiY21idm9wb2Q5MGc2bDJtb3M4dmlwdzZjNCJ9.e6usXadXOHqIPfN6N6745A'

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('unable to connect to location services!', undefined)
    } else if (!response.body.features || response.body.features.length === 0) {
      callback('unable to find location. Try another search', undefined)
    } else {
      const feature = response.body.features[0]
      callback(undefined, {
        latitude: feature.properties.coordinates.latitude,
        longitude: feature.properties.coordinates.longitude,
        location: feature.properties.full_address // or use place_formatted if you prefer
      })
    }
  })
}

const forecast = (latitude, longitude, callback) => {
const url = 'https://api.weatherstack.com/current?access_key=6373a604c1ae2a8c693a47e1f47c0c6c&query=' + latitude + ',' + longitude + '&units=f'

    request({url: url, json: true}, (error, response) => {
        if (error) {
            console.log('unable to connect to weather service')
        } else if (response.body.error) {
            console.log('unable to find location')
        } else {
            callback(undefined, {
            weather: response.body.current.weather_descriptions[0],
            temperature: response.body.current.temperature,
            feelslike: response.body.current.feelslike
        })
        }
    })
}

module.exports = { geocode, forecast }