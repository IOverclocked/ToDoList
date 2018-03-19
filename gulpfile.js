const gulp = require('gulp');
const sass = require('gulp-sass');
const map = require('gulp-sourcemaps');

gulp.task('sass', function(){
    return gulp.src('sass/**/*.scss')
        .pipe(map.init())
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: "expanded"
        }))
        .pipe(map.write())
        .pipe(gulp.dest('css'))
})

gulp.task('watch', function(){
    gulp.watch('sass/**/*.scss', ['sass']);
})

gulp.task('default', ['watch']);
