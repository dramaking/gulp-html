'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import {create as bsCreate} from 'browser-sync';
const browserSync = bsCreate();
import useref from 'gulp-useref';
import uglify from 'gulp-uglify';
import gulpIf from 'gulp-if';
import cssnano from 'gulp-cssnano';
import imagemin from 'gulp-imagemin';
import cache from 'gulp-cache';
import del from 'del';
import runSequence from 'run-sequence';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';

// Developemnt Tasks
// -----------------

// Compile Sass to CSS
gulp.task('sass', () => {
  return gulp.src('app/scss/**/*.scss')
    // sourcemap: tell the browser where does the code from originally
    .pipe(sourcemaps.init())
    // Compile Sass to CSS
    // Implementing Susy for the grid system
    .pipe(sass({
      includePaths: ['node_modules/susy/sass']
    }).on('error', sass.logError))
    // autoprefixer
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Live-reloading
gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

// Watch sass, html, js files for change once saved
gulp.task('watch', () => {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

// Optimization Tasks
// ------------------

// Concatenate CSS and js files into a single file
gulp.task('useref', () => {
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it is a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    // Minifies onlu if it is a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

// Optimize the images
gulp.task('images', () => {
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
});

// Copying fonts to dist
gulp.task('fonts', () => {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
});

// Cleaning the dist folder
gulp.task('clean:dist', () => {
  return del.sync('dist');
})


// Build Sequences
// ---------------

// Combine the tasks to create the production site
gulp.task('build', (callback) => {
  runSequence(
    'clean:dist',
    'sass',
    ['useref', 'images', 'fonts'],
    callback
  )
})

// Combine the tasks for development
gulp.task('default', (callback) => {
  runSequence(['sass', 'browserSync'], 'watch',
    callback
  )
})
