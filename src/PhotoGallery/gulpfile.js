var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    merge = require('merge'),
    fs = require("fs"),
    del = require('del'),
    path = require('path');

eval("var project = " + fs.readFileSync("./project.json"));
var lib = "./" + project.webroot + "/lib/";

var paths = {
    npm: './node_modules/',
    tsSource: './wwwroot/app/**/*.ts',
    tsOutput: lib + 'spa/',
    tsDef: lib + 'definitions/',
    jsVendors: lib + 'js',
    jsRxJSVendors: lib + 'js/rxjs',
    cssVendors: lib + 'css',
    imgVendors: lib + 'img',
    fontsVendors: lib + 'fonts'
};


var tsProject = ts.createProject('./wwwroot/tsconfig.json');

gulp.task('setup-vendors', function (done) {
    gulp.src([
      'node_modules/jquery/dist/jquery.*js',
      'bower_components/bootstrap/dist/js/bootstrap*.js',
      'node_modules/fancybox/dist/js/jquery.fancybox.pack.js',
      'bower_components/alertify.js/lib/alertify.min.js',
      'systemjs.config.js'
    ]).pipe(gulp.dest(paths.jsVendors));

    gulp.src([
      'bower_components/bootstrap/dist/css/bootstrap.css',
      'node_modules/fancybox/dist/css/jquery.fancybox.css',
      'bower_components/components-font-awesome/css/font-awesome.css',
      'bower_components/alertify.js/themes/alertify.core.css',
      'bower_components/alertify.js/themes/alertify.bootstrap.css',
      'bower_components/alertify.js/themes/alertify.default.css'
    ]).pipe(gulp.dest(paths.cssVendors));

    gulp.src([
      'node_modules/fancybox/dist/img/blank.gif',
      'node_modules/fancybox/dist/img/fancybox_loading.gif',
      'node_modules/fancybox/dist/img/fancybox_loading@2x.gif',
      'node_modules/fancybox/dist/img/fancybox_overlay.png',
      'node_modules/fancybox/dist/img/fancybox_sprite.png',
      'node_modules/fancybox/dist/img/fancybox_sprite@2x.png'
    ]).pipe(gulp.dest(paths.imgVendors));

    gulp.src([
      'node_modules/bootstrap/fonts/glyphicons-halflings-regular.eot',
      'node_modules/bootstrap/fonts/glyphicons-halflings-regular.svg',
      'node_modules/bootstrap/fonts/glyphicons-halflings-regular.ttf',
      'node_modules/bootstrap/fonts/glyphicons-halflings-regular.woff',
      'node_modules/bootstrap/fonts/glyphicons-halflings-regular.woff2',
      'bower_components/components-font-awesome/fonts/FontAwesome.otf',
      'bower_components/components-font-awesome/fonts/fontawesome-webfont.eot',
      'bower_components/components-font-awesome/fonts/fontawesome-webfont.svg',
      'bower_components/components-font-awesome/fonts/fontawesome-webfont.ttf',
      'bower_components/components-font-awesome/fonts/fontawesome-webfont.woff',
      'bower_components/components-font-awesome/fonts/fontawesome-webfont.woff2',
    ]).pipe(gulp.dest(paths.fontsVendors));
});

gulp.task('compile-typescript', function (done) {
    var tsResult = gulp.src([
       "wwwroot/app/**/*.ts"
    ])
     .pipe(ts(tsProject), undefined, ts.reporter.fullReporter());
    return tsResult.js.pipe(gulp.dest(paths.tsOutput));
});

gulp.task('watch.ts', ['compile-typescript'], function () {
    return gulp.watch('wwwroot/app/**/*.ts', ['compile-typescript']);
});

gulp.task('watch', ['watch.ts']);

gulp.task('clean-lib', function () {
    return del([lib]);
});

gulp.task('build-spa', ['setup-vendors', 'compile-typescript']);