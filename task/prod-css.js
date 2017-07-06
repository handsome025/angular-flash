var gulp = require('gulp')
var $ = require('gulp-load-plugins')()

gulp.task('prod-css', function () {
    return gulp.src(['dist/**/*.css'])
        .pipe($.cssmin({
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest('dist'))
})