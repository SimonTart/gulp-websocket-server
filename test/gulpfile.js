const gulp = require('gulp');
const gulpwss = require('../index.js');
const wss = gulpwss({
    port: 4000,
    path: '/ws'
});

gulp.task('js',()=>{
    return gulp.src('./assets/main.js')
        .pipe(wss.livereload('js change'));
});

gulp.task('css', () => { 
    console.log('css change');
    wss.send('css change');
});


gulp.watch('./assets/main.js', ['js']);
gulp.watch('./assets/index.css', ['css']);

gulp.task('default', []);