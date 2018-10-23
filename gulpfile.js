const gulp = require('gulp')
const pump = require('pump')

gulp.task('default', copyFiles)

function copyFiles(done) {
  // let root = 'dist/spaier-ng-recaptcha'
  let output = 'dist/spaier-ng-recaptcha'
  pump([
    gulp.src(['README.md', 'LICENSE']),
    gulp.dest(output)
  ], done())
}
