'use scrict';

/* base */
const { src, dest, parallel, lastRun, watch } = require('gulp');
const concat = require('gulp-concat');

/* script */
const uglify = require('gulp-uglify');

/* server */
const browserSync = require('browser-sync').create();

/* paths */
const path = {
  src: {
    styles: 'assets/scss/**/*.scss',
    scripts: 'assets/js/**/*.js',
    images: ['img/**/*.jpg','img/**/*.png']
  },
  dest: {
    styles: 'css',
    scripts: 'js',
    images: 'img'
  },
  watch: {
    styles: 'assets/scss/**/*.scss',
    scripts: 'assets/js/**/*.js',
    html: '*.html'
  }
};


function html() {
  return src('client/templates/*.pug')
    .pipe(dest('build/html'))
}

function css() {
  return src('client/templates/*.less')
    .pipe(dest('build/css'))
}

function js() {
  return src('client/javascript/*.js', { sourcemaps: true })
    .pipe(concat('all.js'))
    .pipe(dest('build/js', { sourcemaps: true }))
}

function server() {
  browserSync.init({
    open: true,
    port: 8080,
    ui: {port: 8081},
    server: {baseDir: ''}
  });

  gulp.watch(path.watch.html).on('change', gulp.series(browserSync.reload));
  gulp.watch(path.watch.styles).on('change', gulp.series('style', browserSync.reload));
  gulp.watch(path.watch.scripts).on('change', gulp.series('script', browserSync.reload));
}

/*function copy() {
  return src('input/*.js')
    .pipe(dest('output/'));
}*/


exports.js = js;
exports.css = css;
exports.html = html;
//exports.copy = copy;
exports.default = parallel(html, css, js);