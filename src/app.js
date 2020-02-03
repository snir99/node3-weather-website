const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Express is a function that returns object we can use.
const app = express();

// The port we will listen to.
// 3000 is the port if we use this app locally.
// process.env.PORT is a port that will be used if we deploy this app externaly (like heroku)
const port = process.env.PORT || 3000;

// Define paths for Express configuration.
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location.
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve.
app.use(express.static(publicDirectoryPath));

// Root page.
// Making use of dynamic page attributes.
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'The Greek Freek'
    });
});

// About page.
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'The Greek Freek'
    });
});

// Help page.
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'We can help you!',
        name: 'Baby Face Assasin'
    });
})

// Weather endpoint
app.get('/weather', (req, res) => {

    const address = req.query.address;
    // Error handling.
    // in case there is no address property in the query string.
    if(!address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address
            });
        });
    });
});

// 404 page, case help page
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Baby Face Assasin',
        errorMessage: 'Help article not found'
    });
});

// 404 page, case general.
// Any page that was not mentioned above will come under this.
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Baby Face Assasin',
        errorMessage: 'Page not found'
    });
});

// Telling the server to listen to a cretain port.
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});