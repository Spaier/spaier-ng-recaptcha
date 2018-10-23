const npsUtils = require('nps-utils') // not required, but handy!

module.exports = {
  scripts: {
    compodoc: {
      default: 'compodoc -p tsconfig.json -d docs',
      serve: 'compodoc -s'
    },
    lint: {
      default: 'ng lint',
      js: 'eslint *.js',
      all: 'eslint *.js && ng lint'
    },
    build: {
      default: 'ng build && gulp',
      sample: 'ng build sample --prod',
      ci: 'nps build && nps build.sample'
    },
    serve: {
      default: 'ng serve',
      prod: 'ng serve --prod'
    },
    test: {
      default: 'ng test',
      ci: 'ng test -c ci'
    },
    e2e: {
      default: 'ng e2e',
      ci: 'ng e2e -c ci-prod'
    },
    ci: 'nps lint.all && nps build.ci && nps test.ci && nps e2e.ci'
  },
}
