var gulp = require('gulp')
var $ = require('gulp-load-plugins')()
var config = require('./config')

gulp.task('dev-lib',  function () {
    return gulp.src(config.getConfig().lib)
        .pipe($.plumber(function (err) {
            this.emit('end')
        }))
        .pipe($.sourcemaps.init())
        .pipe($.concat('lib.js'))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
})