const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(address) + '&access_token=pk.eyJ1IjoiamVhbGVlNDQiLCJhIjoiY21idm9wb2Q5MGc2bDJtb3M4dmlwdzZjNCJ9.e6usXadXOHqIPfN6N6745A'

  request({ url, json: true }, (error, response = {}) => {
    const body = response.body || {};
    if (error) {
      callback('unable to connect to location services!', undefined)
    } else if (!body.features || body.features.length === 0) {
      callback('unable to find location. Try another search', undefined)
    } else {
      const feature = body.features[0]
      callback(undefined, {
        latitude: feature.properties.coordinates.latitude,
        longitude: feature.properties.coordinates.longitude,
        location: feature.properties.full_address // or .place_formatted
      })
    }
  })
}

module.exports = geocode
