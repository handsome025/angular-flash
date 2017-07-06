var gulp = require('gulp')
var $ = require('gulp-load-plugins')()
var config = require('./config')

gulp.task('dev-theme-js', function () {
    config.getConfig().theme.forEach(function (name) {
        var jsFilter = $.filter('**/*.js', {restore: true})
        var htmlFilter = $.filter('**/*.html', {restore: true})
        gulp.src([
            'theme/' + name + '/**/*.js',
            'theme/' + name + '/**/*.html'
        ])
            .pipe($.plumber(function (err) {
                this.emit('end')
            }))
            .pipe($.sourcemaps.init())
            .pipe(htmlFilter)
            .pipe($.replace(/(src\s*?=\s*?["'])([^({{|http://|https://)])/g, '$1dist/$2'))
            .pipe($.replace(/(url\s*?\(\s*?["'])([^({{|http://|https://)])/g, '$1dist/$2'))
            .pipe($.angularTemplatecache('theme-' + name + '.js', {module: 'ued'}))
            .pipe(htmlFilter.restore)
            .pipe(jsFilter)
            .pipe($.wrap('(function() {\n\n<%= contents %>\n\n})();\n\n'))
            .pipe(jsFilter.restore)
            .pipe($.concat('theme-' + name + '.js'))
            .pipe($.sourcemaps.write('.'))
            .pipe(gulp.dest('dist'))
    })
})
