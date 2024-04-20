const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b294934c0a9d9f7e5fe6e83d13df18cb&query=' + latitude +','+ longitude +'&units=m'

    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('not connected to internet')
        }else if(body.error){
            callback('invalid location', undefined)
        }else{
            callback(error, ' It is currently ' + body.current.temperature +' degrees out. It feels like ' + body.current.feelslike +' out')
        }
    })
}

module.exports = forecast