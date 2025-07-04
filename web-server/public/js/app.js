console.log('CLientside js file is loaded!')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //doesnt automatically refresh browser and reset things

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent =  data.forecast.weather +
        '. It is currently ' +
        data.forecast.temperature +
        ' degrees out. It feels like ' +
        data.forecast.feelslike + '.' + ' The humidity is ' + data.forecast.humidity + '%.'
        }
    })
})
})