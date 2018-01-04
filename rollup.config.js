import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
const globals = {
  '@angular/core': 'ng.core',
  '@angular/common': 'ng.common',
  "@angular/forms": 'ng.forms',
  'rxjs/Rx': 'Rx',
  'rxjs/Observable': 'Rx',
  'rxjs/Observer': 'Rx',
  'rxjs/BehaviorSubject': 'Rx',
  'rxjs/Subscription' : 'Rx'
};
export default {
  entry: './dist/modules/spaier-ng-recaptcha.es5.js',
  dest: './dist/bundles/spaier-ng-recaptcha.umd.js',
  format: 'umd',
  exports: 'named',
  moduleName: 'ng.spaierRecaptcha',
  plugins: [
    resolve(),
    commonjs()
  ],
  external: Object.keys(globals),
  globals: globals,
  onwarn: () => {
    return;
  }
};
