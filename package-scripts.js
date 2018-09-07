const npsUtils = require('nps-utils') // not required, but handy!

module.exports = {
  scripts: {
    compodoc: {
      default: 'compodoc -p tsconfig.json -d docs',
      serve: 'compodoc -s'
    },
    build: {
      default: 'ng build && gulp'
    },
    test: {
      default: 'ng test',
      ci: 'ng test -c ci'
    }
  },
}
