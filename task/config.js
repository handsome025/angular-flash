var gulpConfig = require('../package.json').gulpConfig
var fs = require('fs')
var path = require('path')

exports.getConfig = function () {
    return gulpConfig
}

exports.update = function (callback) {
    fs.readFile(path.resolve(__dirname, '../package.json'), function (err, data) {
        if (err) {
            console.error(err)
            return
        }
        try {
            var json = JSON.parse(data.toString())
            gulpConfig = json.gulpConfig
            callback()
        } catch(e) {
            console.error(err)
        }
    })
}
