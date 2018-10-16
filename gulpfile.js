const gulp = require('gulp');
const sass = require('gulp-sass');
const useref = require('gulp-useref');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const gulpIf = require('gulp-if');
const imagemin = require('gulp-imagemin');

gulp.task('sass', () =>
  gulp.src('app/scss/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({
    stream: true
  }))
);

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  })
});

gulp.task('useref', () =>
  gulp.src('app/*.html')
  .pipe(useref())
  .pipe(gulpIf('*.css', cssnano()))
  .pipe(gulpIf('*.js', uglify()))
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.reload({
    stream: true
  }))
);

gulp.task('watch', [
    'browserSync',
    'sass'
  ], () => {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
  }
);

gulp.task('images', () =>
  gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/images'))
);

gulp.task('build', [
  'sass',
  'useref',
  'images',
  'watch'
]);
