/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

const gulp = require('gulp');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const ts = require("gulp-typescript");
const del = require('del');
const merge = require('merge2');

/** typescript project */
const tsProject = ts.createProject('tsconfig.json');


/**
 * Cleans the prpl-server build in the server directory.
 */
gulp.task('prpl-server:clean', () => {
  return del('server/build');
});

/**
 * Copies the prpl-server build to the server directory while renaming the
 * node_modules directory so services like App Engine will upload it.
 */
gulp.task('prpl-server:build', () => {
  const pattern = 'node_modules';
  const replacement = 'node_assets';

  return gulp.src('build/**')
    .pipe(rename(((path) => {
      path.basename = path.basename.replace(pattern, replacement);
      path.dirname = path.dirname.replace(pattern, replacement);
    })))
    .pipe(replace(pattern, replacement))
    .pipe(gulp.dest('server/build'));
});

gulp.task('prpl-server', gulp.series(
  'prpl-server:clean',
  'prpl-server:build'
));

gulp.task('tsc:compile', function() {

  var tsResult = gulp.src(['ts/*.ts', 'ts/**/*.ts'])
                  .pipe(tsProject());

  return merge([ // Merge the two output streams, so this task is finished         when the IO of both operations are done. 
      tsResult.dts.pipe(gulp.dest('src')),
      tsResult.js.pipe(gulp.dest('src'))
  ]);
});

/**
 * Watch for typescript source changes and re-compile
 */
gulp.task('tsc:watch', function() {
  gulp.watch(['ts/*.ts', 'ts/**/*.ts'], gulp.task('tsc:compile'));
});