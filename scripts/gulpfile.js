const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

gulp.task('html',  __ => {
    return gulp.src('./js/common/html/*.html')
        .pipe(plugins.htmlmin({ collapseWhitespace: true }))
        .pipe(plugins.rename({suffix: '.mini'}))
        .pipe(gulp.dest('./js/common/html'));
});

gulp.task('mini', gulp.series('html', async __ => {}));