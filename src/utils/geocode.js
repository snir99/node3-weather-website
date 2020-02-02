const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + 
                encodeURIComponent(address) + // handling special character cases.
                '.json?access_token=pk.eyJ1IjoiYnl0ZW1lIiwiYSI6ImNrNjB0ams5YzBhdnEzbW55YjFsOGxyd2kifQ.FB2u5p6rSqjJex-JSWEf8w&limit=1';

    request({ url: url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to weather serviece!', undefined);
        } else if(response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0], 
                location: response.body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;