const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/c94a24d455f24cb4c8b9063002a15916/' +
                latitude + ',' + 
                longitude +
                '?units=si';
    
    request({ url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather serviece!', undefined);
        } else if(body.error) {
            callback('Unable to find location.', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + 
                                body.currently.temperature + ' degrees out. There is a ' + 
                                body.currently.precipProbability + '% chance of rain.\n' + 
                                'Humidity: ' + body.currently.humidity + ',\n' + 
                                'Wind speed: ' + body.currently.windSpeed);
        }
    });
};

module.exports = forecast;