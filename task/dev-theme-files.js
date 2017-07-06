var gulp = require('gulp')
var $ = require('gulp-load-plugins')()
var config = require('./config')

gulp.task('dev-theme-files', function () {
    config.getConfig().theme.forEach(function (name) {
        gulp.src(
            ['theme/' + name + '/**/*.*', '!theme/**/*.{less,js,html}'],
            {base: 'theme'}
        )
            .pipe($.plumber(function (err) {
                this.emit('end')
            }))
            .pipe(gulp.dest('dist'))
    })
})