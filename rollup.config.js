import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';

const globals = {
  '@angular/core': 'ng.core',
  '@angular/common': 'ng.common',
  "@angular/forms": 'ng.forms',
  'rxjs/Rx': 'Rx',
  'rxjs/Observable': 'Rx',
  'rxjs/Observer': 'Rx',
  'rxjs/BehaviorSubject': 'Rx',
  'rxjs/Subscription': 'Rx'
};
export default {
  input: './dist/modules/spaier-ng-recaptcha.es5.js',
  output: {
    file: './dist/bundles/spaier-ng-recaptcha.umd.js',
    format: 'umd',
    sourcemap: true,
    amd: { id: 'spaier-ng-recaptcha' },
  },
  exports: 'named',
  moduleName: 'ng.spaierRecaptcha',
  plugins: [
    resolve(),
    commonjs(),
    sourcemaps()
  ],
  external: Object.keys(globals),
  globals: globals,
  onwarn: () => {
    return;
  }
};
