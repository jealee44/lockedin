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

module.exports = geocode