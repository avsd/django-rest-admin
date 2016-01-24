const gulp = require('gulp');
const babel = require('gulp-babel');
const gutil = require('gulp-util');

var path = {
  REACT_SCHEMA_SRC: 'rest_admin/plugins/react/templates/rest_admin_react/schema.jsx',
  ES5_SCHEMA_DEST: 'rest_admin/plugins/react/templates/rest_admin_react/es5/',
};
 
gulp.task('react_schema', () => {
  return gulp.src(path.REACT_SCHEMA_SRC)
    .pipe(babel({
        presets: ['es2015', 'react', 'stage-0']
    }))
    .pipe(gulp.dest(path.ES5_SCHEMA_DEST));
});

/*
gulp.task('react_static', () => {
  return gulp.src(path.REACT_STATIC_SRC
});
*/
