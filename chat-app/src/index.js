const express = require('express')
const http = require('http')
const path = require('path')
const app = express();
const socketio = require('socket.io')
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000 
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

let count = 0;

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.emit('countUpdated', count)

    socket.on('increment', () => {
        count++
        // socket.emit('countUpdated', count) //emit to this specific connection which would be increment here
        io.emit('countUpdated', count) //emit to every connection
    })
})



server.listen(port, () => {
    console.log(`Listening on port ${port}!`)
})