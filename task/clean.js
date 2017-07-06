var gulp = require('gulp')
var $ = require('gulp-load-plugins')()

gulp.task('clean', function () {
    return gulp.src([
        'dist/**/*.*',
        'dev/**/*.*'
    ], {read: false})
        .pipe($.clean())
})
