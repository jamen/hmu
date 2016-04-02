var gulp = require('gulp');
var master = [];


var eslint = require('gulp-eslint');
gulp.task('lint:javascript', function() {
  return gulp.src('src/**.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
master.push('lint:javascript');


gulp.task('default', master);
