var gulp = require('gulp')
var $ = require('gulp-load-plugins')()
var config = require('./config')

gulp.task('watch', ['dev'], function () {
    $.watch('vendor/**/*.js', function () {
        gulp.start(['dev-lib'])
    })

    $.watch(config.getConfig().app, function () {
        gulp.start(['dev-app'])
    })

    $.watch('theme/**/*.*', function () {
        console.log(arguments)
        gulp.start(['dev-theme'])
    })
    
    $.watch('package.json', function () {
        config.update(function () {
            gulp.start(['dev'])
        })
    })

    gulp.start(['server'])
})
