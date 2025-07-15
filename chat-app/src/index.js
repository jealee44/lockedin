import express from 'express'
import http from 'http'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { Server } from 'socket.io'
import { Filter } from 'bad-words'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.emit('message', 'Welcome')
    socket.broadcast.emit('message', 'A new user has joined!')

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

        io.emit('message', message)
        callback() // acknowledge success
    })

    socket.on('sendLocation', (position, callback) => {
        const url = `https://www.google.com/maps?q=${position.latitude},${position.longitude}`
        
        io.emit('message', url)
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left')
    })
})

server.listen(port, () => {
    console.log(`Listening on port ${port}!`)
})
