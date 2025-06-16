const https = require('https')
const url = 'https://api.weatherstack.com/current?access_key=6373a604c1ae2a8c693a47e1f47c0c6c&query=45,-75&units=f'

const request = https.request(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
        data = data + chunk.toString()
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })
})

request.on('error', (error) => {
    console.log('An error', error)
})

request.end()