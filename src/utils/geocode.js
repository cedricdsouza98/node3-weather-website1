const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2VkcmljZHNvdXphIiwiYSI6ImNsZmZzcjQ1ZzB6bTEzem56c3Fid2ZmY2QifQ.WplBFqsZPRiTIFmueykxiw'

    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('not connected to internet', undefined)
        }else if(body.features.length === 0){
            callback('Invalid Location lat/lon', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name 
            })
                
        }
    })
}

module.exports = geocode
