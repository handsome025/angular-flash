var gulp = require('gulp')
var $ = require('gulp-load-plugins')()

gulp.task('prod-js', function () {
    return gulp.src(['dist/**/*.js'])
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe(gulp.dest('dist'))
})