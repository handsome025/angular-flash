var gulp = require('gulp')
var $ = require('gulp-load-plugins')()
var config = require('./config')

gulp.task('dev-theme-css', function () {
    config.getConfig().theme.forEach(function (name) {
        gulp.src(['theme/' + name + '/{common,component,page}/**/*.less'])
            .pipe($.plumber(function (err) {
                this.emit('end')
            }))
            .pipe($.sourcemaps.init())
            .pipe($.less())
  //          .pipe($.replace(/(url\(["']?)/g, '$1' + name + '/'))
            .pipe($.concat('theme-' + name + '.css'))
            .pipe($.autoprefixer({
                browsers: ['> 0%']
            }))
            .pipe($.sourcemaps.write('.'))
            .pipe(gulp.dest('dist'))
    })
})
