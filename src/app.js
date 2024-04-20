const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))


const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//ssetup handlebars 
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'Cedric Dsouza'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about page',
        name: 'Cedric Dsouza'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    } 

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'this is help text',
        title: 'help page',
        name: 'Cedric Dsouza'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'no location'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send( {error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })
    // res.send({
    //     forecast: 'Sunny',
    //     location: req.query.location
    // })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        page_name: 'Help Page'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        page_name: 'Page'
    })
})

//listens for requests
app.listen(port, () => {
   console.log('server is up on port ' + port) 
})