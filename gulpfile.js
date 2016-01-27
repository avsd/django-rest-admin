'use strict';

const browserify = require('browserify');
const gulp = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const gutil = require('gulp-util');

const path = {
  SCHEMA_REACT_SRC: 'rest_admin/plugins/react/templates/rest_admin_react/schema.jsx',
  SCHEMA_ES5_DEST: 'rest_admin/plugins/react/templates/rest_admin_react/es5/',
  STATIC_REACT_SRC: 'rest_admin/plugins/react/static/rest_admin_react/index.js',
  STATIC_ES5_DEST: 'rest_admin/plugins/react/static/rest_admin_react/es5/'
};

const BABEL_PRESETS = ['es2015', 'react', 'stage-0']
 
gulp.task('react_schema', () => {
  return gulp.src(path.SCHEMA_REACT_SRC)
    .pipe(babel({
        presets: BABEL_PRESETS
    }))
    .pipe(gulp.dest(path.SCHEMA_ES5_DEST));
});

/*
gulp.task('react_static', () => {
  return gulp.src(path.REACT_STATIC_SRC
});
*/

gulp.task('react_static', function () {

  // set up the browserify instance on a task basis
  const b = browserify(path.STATIC_REACT_SRC).transform('babelify', {presets: BABEL_PRESETS});

  return b.bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    //.pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        //.pipe(uglify())
    .on('error', gutil.log)
    //.pipe(sourcemaps.write('./'))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(path.STATIC_ES5_DEST));
});
