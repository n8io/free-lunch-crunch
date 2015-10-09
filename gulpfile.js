var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('clean', function() {
  return gulp.src('./dist', {read: false})
    .pipe(plugins.rimraf())
    ;
});

gulp.task('watch', function() {
  gulp.watch('./client/html/*.jade', ['html']);
});

gulp.task('html', function() {
  return gulp.src('./client/html/**/*.jade')
    .pipe(plugins.plumber())
    .pipe(plugins.changed('./dist'))
    .pipe(plugins.jade({pretty: true}))
    .pipe(gulp.dest('./dist'))
    ;
});

gulp.task('start', function() {
  plugins.nodemon({
    script: 'app.js',
    ignore: ['client/**', 'client/**/*.js']
  })
})

gulp.task('default', plugins.sequence('clean', ['js', 'html']));
gulp.task('dev', plugins.sequence('clean', 'html', 'watch', 'start'));
