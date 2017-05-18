var gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    rename     = require("gulp-rename"),
    uglify     = require('gulp-uglify'),
    sass     = require('gulp-sass'),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    gutil = require('gulp-util'),
    browserSync = require('browser-sync').create();


// Minimum js file
gulp.task('uglify', function() {
  gulp.src('build/js/*.js')
  .pipe(uglify())
  .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
  .pipe(rename(function(path) {
    path.basename += ".min";
    path.extname = ".js";
  }))
  .pipe(gulp.dest('js/'))
  .pipe(browserSync.stream());
});

// Write SASS file
gulp.task('sass', function(){
  gulp.src('build/sass/*.scss')
  .pipe(sass())
  .pipe(gulp.dest("app/css"))
  .pipe(cleanCSS())
  .pipe(rename(function(path) {
    path.basename += ".min";
    path.extname = ".css";
  }))
  .pipe(gulp.dest('stylesheets/'))
  .pipe(browserSync.stream());
});

// Include HTML file
gulp.task('fileinclude', function() {
  gulp.src(['build/*.html'])
  .pipe(fileinclude({
    prefix: '@@',
    basepath: '@file'
  }))
  .pipe(gulp.dest('./'))
  .pipe(browserSync.stream());
});

// Clean build folder
gulp.task('clean', function(cb) {
  del(['./'], cb)
});

// Gulp Watch
gulp.task('watch', ['sass','fileinclude','uglify'], function() {
  browserSync.init({
    server: {
        baseDir: "./",
    },
    reloadDelay: 100
  });
  gulp.watch('build/*.html', ['fileinclude']);
  gulp.watch('build/sass/*.scss',['sass']);
  gulp.watch('build/js/*.js',['uglify']);
  // Other watchers
});

// Gulp
gulp.task('default', ['watch']);
