var gulp = require('gulp')
var $ = require('gulp-load-plugins')()
var connect = $.connectMulti()
var path = require('path')

gulp.task('server', function () {
    return connect.server({
        root: [path.resolve(__dirname, '../')],
        livereload: false,/*{
            enable: true,
            port: 20000 + parseInt(Math.random() * 10000)
        },*/
        port: 10000 + parseInt(Math.random() * 10000),
        open: {
            file: 'dev.html'
        }
    })
}())
