const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(address) + '&access_token=pk.eyJ1IjoiamVhbGVlNDQ0IiwiYSI6ImNtYzhlcWN5MjB2ZmQyb3EyOG5ybDg1a2cifQ.WaZ1Eg92T_Idd7pFEWorJQ'

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
