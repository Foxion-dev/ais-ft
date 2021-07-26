const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    spritesmith = require('gulp.spritesmith'),
    plumber = require('gulp-plumber'),
    notify = require("gulp-notify"),
    babel = require('gulp-babel'),
    cheerio = require("gulp-cheerio"),
    svgstore = require("gulp-svgstore"),
    svgmin = require("gulp-svgmin"),
    mediaQuires = require("gulp-group-css-media-queries");


const dirs = {
    libs: 'assets/js/libs/',
    scss: 'assets/scss',
    css: 'assets/css',
    es6: 'assets/es6',
    js: 'assets/js'
};

gulp.task('browser-sync', function () {
    browserSync.init({
        // proxy: 'mosferum.bitrix',
        // notify: false
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('sass', function () {
    return gulp.src(dirs.scss + '/**/*.+(scss|sass)')
        .pipe(sourcemaps.init())
        .pipe(plumber({
            errorHandler: notify.onError((error) => {
                return {
                    title: 'Error',
                    message: error.message
                }
            })
        }))
        .pipe(sass())
        .pipe(autoprefixer(['last 50 versions']))
        .pipe(mediaQuires())
        .pipe(cssnano({
            zindex: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest(dirs.css))
        .pipe(browserSync.stream())
});

gulp.task('es6', () => {
    return gulp.src(dirs.es6 + '/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(plumber({
            errorHandler: notify.onError((error) => {
                return {
                    title: 'Error',
                    message: error.message
                }
            })
        }))
        .pipe(babel({
            presets: ['es2015', 'babili']
        }))
        .pipe(concat('main.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest(dirs.js));
});

gulp.task('scripts', function () {
    return gulp.src(dirs.libs + '/**/*.js')
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dirs.js));
});

gulp.task('css:libs', function () {
    return gulp.src(dirs.css + '/libs/**/*.css')
        .pipe(concat('libs.min.css'))
        .pipe(cssnano({
            zindex: false
        }))
        .pipe(gulp.dest(dirs.css));
});

gulp.task('svgSprite', function () {
    return (
        gulp
        .src('assets/images/svg/**/*.svg') // указываем путь к svg файлам
        .pipe(
            svgmin({
                plugins: [{
                    removeViewBox: false
                }]
            })
        ) // минимизируем svg перед созданием спрайта
        .pipe(
            cheerio({
                run: function ($) {
                    $("[fill]").removeAttr("fill");
                    $("[stroke]").removeAttr("stroke");
                },
                parserOptions: {
                    xmlMode: true
                }
            })
        )
        // .pipe(replace('&gt;', '>'))
        .pipe(
            svgstore({
                // создаем спрайт
                inlineSvg: true // уберет из файла все не нужное (doctype, xml и прочее)
            })
        )
        .pipe(rename("sprite.svg")) // перименовываем svg
        .pipe(gulp.dest('assets/images/'))
    ); // выгружаем в папку build/img
});


gulp.task('html', function () {
    return gulp.src('*.+(html|php)')
        .pipe(browserSync.stream())
});


gulp.task('watch', function () {
    gulp.watch('*.+(html|php)', gulp.parallel('html'));
    gulp.watch(dirs.scss + '/**/*.+(scss|sass)', gulp.parallel('sass'));
    gulp.watch(dirs.es6 + '/**/*.js', gulp.parallel('es6'));
    gulp.watch('assets/images/svg/**/*.svg', gulp.parallel('svgSprite'));
    gulp.watch(dirs.js + '/**/*.js', browserSync.reload);

});
//
gulp.task('default', gulp.series('css:libs', 'scripts', gulp.parallel('html', 'browser-sync', 'watch')));