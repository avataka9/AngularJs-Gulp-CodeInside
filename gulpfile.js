'use scrict';

/* BASE */
const { src, dest, parallel, lastRun, watch, series } = require('gulp');
const concat = require('gulp-concat');

/* CLEAN */
const del = require('del');

/* SCRIPTS */
const uglify = require('gulp-uglify');

/* STYLES */
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const postCSS = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

/* SERVER */
const browserSync = require('browser-sync').create();

/* MODE */
const argv = require('yargs').argv;
const isDev = argv.mode === 'development';

/* PATHS */
const path = {
  src: {
    styles: [
      './node_modules/normalize.css/normalize.css',
      'app/src/assets/scss/**/*.scss'
    ],
    scripts: [
			"app/src/assets/js/**/*.js",
			"./node_modules/angular/angular.js",
			"./node_modules/angular-route/angular-route.js",
			"app/src/app.module.js",
			"app/src/app.config.js",
      "app/src/pages/home/pageHome.module.js",
      "app/src/pages/home/pageHome.component.js",
      "app/src/pages/404/page404.module.js",
      "app/src/pages/404/page404.component.js",
      "app/src/pages/header.module.js",
      "app/src/pages/header.component.js",
      "app/src/pages/footer.module.js",
      "app/src/pages/footer.component.js",
    ],
    html: 'app/src/**/*.html',
    images: ['app/src/assets/img/**/*.jpg','app/src/assets/img/**/*.png']
  },
  dest: {
    styles: 'app/public/css',
    scripts: 'app/public/js',
    html: 'app/public',
    images: 'app/public/img'
  },
  watch: {
    styles: 'app/src/**/*.scss',
    scripts: 'app/src/**/*.js',
    html: 'app/src/**/*.html'
  }
};

/* TASKS */
function clean() {
  return new Promise(function(resolve, reject) {
    del.sync([
      path.dest.html
    ]);
    resolve();
  });
}

function html() {
  //script();
  return src(path.src.html)
    .pipe(dest(path.dest.html))
}

function style() {
  return src(path.src.styles, (isDev ? { sourcemaps: true } : {}) )
		.pipe(sass().on('error', sass.logError))
		.pipe(postCSS([ autoprefixer() ]))
    .pipe(concat('app.css'))
    .pipe(dest(path.dest.styles, (isDev ? { sourcemaps: true } : {}) ))
}

function script() {
  return src(path.src.scripts, (isDev ? { sourcemaps: true } : {}) )
    .pipe(concat('app.js'))
    .pipe(dest(path.dest.scripts, (isDev ? { sourcemaps: true } : {}) ))
}

function images() {
 return src(path.src.images)
 .pipe(dest(path.dest.images));
}

function server() {
  browserSync.init({
    open: true,
    port: 8080,
    ui: {port: 8081},
    server: {baseDir: 'app/public'}
  });

  watch(path.watch.html).on('change', series('html', browserSync.reload));

  watch(path.watch.styles).on('change', series('style', browserSync.reload));

  watch(path.watch.scripts).on('change', series('script', browserSync.reload));
}

/*function copy() {
  return src('input/*.js')
    .pipe(dest('output/'));
}*/

exports.script = script;
exports.style = style;
exports.html = html;
exports.images = images;
exports.clean = clean;
//exports.copy = copy;
exports.build = parallel(images, style, script, html);
exports.default = series(clean, parallel(images, style, script, html), server);