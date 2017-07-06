var gulp = require('gulp')
var $ = require('gulp-load-plugins')()
var config = require('./config')

gulp.task('dev-app', function () {
    return gulp.src(config.getConfig().app)
        .pipe($.plumber(function (err) {
            this.emit('end')
        }))
        .pipe($.sourcemaps.init())
        .pipe($.wrap('(function() {\n/* ========== <%= file.sourceMap.file %> ========== */\n\n<%= contents %>\n\n})();\n\n'))
        .pipe($.concat('app.js'))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
})