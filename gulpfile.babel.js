/**
 * Gulpfile
 * Author: Sriram Kasyap Meduri
 * Date: 24th Jan, 2019
 * Required Gulp Version: 4.0.0
 *
 * Description: Gulp file to Compile SASS/SCSS, Transpile, Bundle and Minify JS files, then serve them via browserSync.
 */

/**
 * Project Constants
 *
 * Change the project name and URL as require. No need to change others unless absolutely required.
 */
"use strict";

var project = "samskruti",
    projectURL = `http://localhost/${project}/`,
    styleSRC = "src/scss",
    styleDestination = "dist/css",
    scriptSRC = "src/js",
    scriptDestination = "dist/js",
    phpWatchFiles = "**/*.php",
    htmlWatchFiles = "**/*.html";

/**
 * Load Plugins
 */
import gulp from "gulp";
import gulpsass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import sourcemaps from "gulp-sourcemaps";
import rename from "gulp-rename";
import notify from "gulp-notify";
import minify from "gulp-minify";
import babel from "gulp-babel";
import filter from "gulp-filter";
import dartsass from "sass";

var sass = gulpsass(dartsass);

/**
 * These plugins are old school cool
 */
var browserSync = require("browser-sync").create();

/**
 * Browsers to be targeted by Autoprefixer
 */
const AUTOPREFIXER_BROWSERS = [
    "last 2 version",
    "> 1%",
    "ie >= 9",
    "ie_mob >= 10",
    "ff >= 30",
    "chrome >= 34",
    "safari >= 7",
    "opera >= 23",
    "ios >= 7",
    "android >= 4",
    "bb >= 10",
];

/**
 * Initialize the BrowserSync. It's the Key!
 */
const browserSyncStart = (done) => {
    browserSync.init({
        proxy: projectURL,
        open: true,
        injectChanges: true,
    });
    done();
};

/**
 * Task to reload Browser using BrowserSync
 */
const reload = (done) => {
    browserSync.reload();
    done();
};

/**
 * Compile SASS/SCSS files to single style.min.css file,
 * Autoprefix for Cross-Browser compatibility,
 * merge multiple media queries,
 * Correct line endings, and
 * Inject the changes into the browser
 */
const compileSass = (done) => {
    gulp.src(`${styleSRC}/**/*.scss`)
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(
            sass({
                errLogToConsole: true,
                outputStyle: "compressed",
                sourceComments: "map",
                sourceMap: "sass",
            })
        )
        .on("error", console.error.bind(console))
        .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest(styleDestination))
        .pipe(filter("**/*.css"))
        .pipe(browserSync.stream())
        .pipe(notify("Stylesheets Compiled! 💯"));
    done();
};

/**
 * Transpile Javascript (or ES6 if you wanna be super cool),
 * minify it and put it in it's place (Script Destination, obviously)
 */
const compileJS = (done) => {
    gulp.src(`${scriptSRC}/**/*.js`)
        .pipe(babel())
        .pipe(
            minify({
                ext: {
                    min: ".js",
                },
            })
        )
        .pipe(gulp.dest(scriptDestination))
        .pipe(notify("Scripts Compiled! 💯"));
    done();
};

/**
 * Watch Sass files in Style Sources folder for changes and Compile.
 */
const watchSass = (done) => {
    gulp.watch(`${styleSRC}/**/*.scss`, compileSass);
    done();
};

/**
 * Watch Javascript files for changes and compile them if they do.
 */
const watchJS = (done) => {
    gulp.watch(`${scriptSRC}/**/*.js`, gulp.series(compileJS, reload));
    done();
};

/**
 * Life is too short to keep hitting F5 and Cmd + R
 * Watch HTML Files for changes and reload the web page when they do.
 */
const watchHTML = (done) => {
    gulp.watch(htmlWatchFiles, reload);
    done();
};

/**
 * Life is still Short..
 * Watch PHP files for changes and reload the web page when they do.
 */
const watchPHP = (done) => {
    gulp.watch(phpWatchFiles, reload);
    done();
};

/**
 * Make all the watch tasks to watch over us from this one single 'watch'.
 */
const watch = gulp.parallel(watchSass, watchJS, watchPHP, watchHTML);

/**
 * Compile the s**t out of all the compiling tasks with one compile command
 */
const compile = gulp.parallel(compileSass, compileJS);

/**
 * The File is ready for Gulp(ing). 'serve' it hot
 */
const serve = gulp.series(compile, browserSyncStart);

/**
 * The Default Task. The Start Switch. The first domino
 */
const defaultTask = gulp.parallel(serve, watch);

/**
 * Let's start Shippin'
 */
export { compile, serve, watch };
export default defaultTask;
