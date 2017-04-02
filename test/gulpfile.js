const gulp = require('gulp');
const gulpwss = require('../index.js');
const wss = gulpwss({
    port: 4000,
    path: '/ws'
});

gulp.task('js',()=>{
    return gulp.src('./assets/main.js')
        .pipe(wss.livereload());
});
gulp.watch('./assets/main.js',['js']);

gulp.task('default',['js']);