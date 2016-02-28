const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const asset = require('gulp-asset-hash');
const del = require('del');
const fixUrl = function() {
    var hash;
    return require('through2').obj(function(file, enc, cb) {
        var contents = file.contents.toString();
        if (hash === undefined) {
            hash = require('./assets.json');
        }

        var contents = contents.replace(/url\(['"]?([^:)'"]+)['"]?\)/gm, function(match, url) {
            url = url.split('?')[0];
            _path = path.normalize(path.dirname(file.path) + '/' + url);
            _path = path.relative(process.cwd(), _path);
            var hashed_path = path.dirname(url) + '/' + path.basename(hash[_path].path);
            return "url('" + hashed_path + "')";
        });
        file.contents = new Buffer(contents);

        this.push(file);
        cb();
    });
};

const src = function(path) {
    return gulp.src('./resources/assets/' + path);
};
const dest = function(path) {
    return gulp.dest('./public/' + path);
};

gulp.task('img', function() {
    return src('img/**/*')
    .pipe(asset.hash())
    .pipe(dest('img'));
});

gulp.task('font', function() {
    return src('font/**/*')
    .pipe(asset.hash())
    .pipe(dest('font'));
});

gulp.task('css', ['font', 'img'], function() {
    return src('css/**/*')
    .pipe(fixUrl())
    .pipe(asset.hash())
    .pipe(dest('css'));
});

gulp.task('clean', function() {
    return del(['./public/img', './public/css', './public/font']);
});
