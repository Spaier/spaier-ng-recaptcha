"use strict";
require('shelljs/global');
const chalk = require('chalk');
const PACKAGE = `spaier-ng-recaptcha`;
const NPM_DIR = `dist`;
const MODULES_DIR = `${NPM_DIR}/modules`;
const BUNDLES_DIR = `${NPM_DIR}/bundles`;
echo(`Start building...`);
rm(`-Rf`, `${NPM_DIR}/*`);
mkdir(`-p`, `./${MODULES_DIR}`);
mkdir(`-p`, `./${BUNDLES_DIR}`);
echo(`Start TSLint`);
exec(`yarn run lint`);
echo(chalk.green(`TSLint completed`));
echo(`Start AoT compilation`);
if (exec(`ngc`).code !== 0) {
  echo(chalk.red(`Error: AoT compilation failed`));
  exit(1);
}
echo(chalk.green(`AoT compilation completed`));
echo(`Start bundling`);
echo(`Rollup package`);
exec(`rollup -i ${NPM_DIR}/index.js -o ${MODULES_DIR}/${PACKAGE}.js --sourcemap`, { silent: true });
exec(`node scripts/map-sources -f ${MODULES_DIR}/${PACKAGE}.js`);
echo(`Downleveling ES2015 to ESM/ES5`);
cp(`${MODULES_DIR}/${PACKAGE}.js`, `${MODULES_DIR}/${PACKAGE}.es5.ts`);
exec(`tsc ${MODULES_DIR}/${PACKAGE}.es5.ts --target es5 --module es2015 --noLib --sourceMap`, { silent: true });
exec(`node scripts/map-sources -f ${MODULES_DIR}/${PACKAGE}.es5.js`);
rm(`-f`, `${MODULES_DIR}/${PACKAGE}.es5.ts`);
echo(`Run Rollup conversion on package`);
if (exec(`rollup -c rollup.config.js --sourcemap`).code !== 0) {
  echo(chalk.red(`Error: Rollup conversion failed`));
  exit(1);
}
exec(`node scripts/map-sources -f ${BUNDLES_DIR}/${PACKAGE}.umd.js`);
echo(`Minifying`);
cd(`${BUNDLES_DIR}`);
exec(`uglifyjs -c --screw-ie8 --comments -o ${PACKAGE}.umd.min.js --source-map ${PACKAGE}.umd.min.js.map --source-map-include-sources ${PACKAGE}.umd.js`, { silent: true });
exec(`node ../../scripts/map-sources -f ${PACKAGE}.umd.min.js`);
cd(`..`);
cd(`..`);
echo(chalk.green(`Bundling completed`));
rm(`-Rf`, `${NPM_DIR}/*.js`);
rm(`-Rf`, `${NPM_DIR}/*.js.map`);
rm(`-Rf`, `${NPM_DIR}/src/**/*.js`);
rm(`-Rf`, `${NPM_DIR}/src/**/*.js.map`);
cp(`-Rf`, [`package.json`, `LICENSE`, `README.md`], `${NPM_DIR}`);
echo(chalk.green(`End building`));
