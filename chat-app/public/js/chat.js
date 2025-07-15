const socket = io()

socket.on('message', (message) => {
    console.log(message)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()

    const message = e.target.elements.message.value
    socket.emit('sendMessage', message, () =>{
        console.log('The message was acknowledged')
    })
})


 document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by our browser.')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', position.coords)
    })


 })