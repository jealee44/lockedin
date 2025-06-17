const path = require('path')
const express = require('express')
const hbs = require('hbs')


const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPaths = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPaths)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jea Lee'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Jea Lee',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is helpful text',
        title: 'Help',
        name: 'Jea'
    })
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is snowing',
        location: 'Philly'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})