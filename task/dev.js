var gulp = require('gulp')

gulp.task('dev', ['clean'], function () {
    gulp.start(['dev-lib', 'dev-app', 'dev-theme'])
})
