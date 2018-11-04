const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const cache = require('gulp-cache');
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const pngout = require('imagemin-pngout');
const autoprefixer = require('gulp-autoprefixer');
const ghPages = require('gulp-gh-pages-will');
const browserSync = require('browser-sync');
const useref = require('gulp-useref');
const gulpIf = require('gulp-if');
const del = require('del');
const runSequence = require('run-sequence');
const babel = require('gulp-babel');

gulp.task('browserSync', () => {
  browserSync({
    server: {
      baseDir: './src',
      routes: {
        '/node_modules': 'node_modules',
      },
    },
    notify: false,
  });
});

gulp.task('sass', () => {
  gulp
    .src('src/sass/**/*.scss')
    .pipe(
      plumber({
        errorHandler: function(error) {
          console.log(error.message);
          this.emit('end');
        },
      }),
    )
    .pipe(sass())
    .pipe(autoprefixer('last 10 versions'))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('images', () => {
  gulp
    .src('src/images/**/*')
    .pipe(
      cache(
        imagemin({
          interlaced: true,
          progressive: true,
          svgoPlugins: [{ removeViewBox: false }],
          use: [pngout()],
        }),
      ),
    )
    .pipe(gulp.dest('dist/images'));
});

gulp.task('css:minify', () =>
  gulp
    .src('src/css/**/*.css')
    .pipe(cleanCss({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist/css')),
);

gulp.task('js', () =>
  gulp
    .src('src/js/*')
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(gulp.dest('dist/js')),
);

gulp.task('js:vendor', () =>
  gulp.src('src/js/vendor/*').pipe(gulp.dest('dist/js/vendor')),
);

gulp.task('useref', () =>
  gulp
    .src('src/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cleanCss({ compatibility: 'ie8' })))
    .pipe(gulp.dest('dist')),
);

gulp.task('clean:dist', () => del.sync('dist'));

gulp.task('watch', ['browserSync', 'sass'], () => {
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('clearcache', () => cache.clearAll());

gulp.task('deploy', () =>
  gulp.src('dist/**/*').pipe(ghPages({ branch: 'master' })),
);

gulp.task('build', callback => {
  runSequence(
    'clean:dist',
    'sass',
    'css:minify',
    ['useref', 'js', 'js:vendor', 'images'],
    callback,
  );
});

gulp.task('default', callback => {
  runSequence(['sass', 'browserSync', 'watch'], callback);
});
