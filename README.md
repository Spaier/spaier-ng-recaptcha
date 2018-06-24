# spaier-ng-recaptcha

[![Build Status](https://travis-ci.org/Spaier/spaier-ng-recaptcha.svg?branch=master)](https://travis-ci.org/Spaier/spaier-ng-recaptcha)
[![npm](https://img.shields.io/npm/v/spaier-ng-recaptcha.svg)](https://www.npmjs.com/package/spaier-ng-recaptcha)
[![npm](https://img.shields.io/npm/l/spaier-ng-recaptcha.svg)](https://www.npmjs.com/package/spaier-ng-recaptcha)

## Prerequisites

Node and npm or yarn.
To use version 1.x.x version with Angular 6 `rxjs-compat` node package must be installed.

## Features

- Supports Angular Reactive/Template forms.
- Supports required attribute.
- Supports V2(I'm not a robot and Invisible) reCAPTCHA.
- Supports dynamic updating of a style or a language without manually reloading a `recaptcha.js` script.
- You can specify a `recaptcha.js` script parameters via `RECAPTCHA_IMPLICIT` and `RECAPTCHA_LANGUAGE` tokens or `RecaptchaLoaderModule.withParameters` method.
- You can provide a custom loader by providing your own `RecaptchaLoaderService`.

## Roadmap

- V3 support
- Providing any amount of reCAPTCHA configurations
- Use Angular 6 CLI
- Angular Elements support

## Table of Contents

* [Installation](#installation)
* [Resources](#resources)
* [License](#license)

## Installation

```bash
npm install spaier-ng-recaptcha
```

or

```bash
yarn add spaier-ng-recaptcha
```

To use version 1.x.x with Angular 6 install `rxjs-compat`

```bash
npm install rxjs-compat
```

```bash
yarn add rxjs-compat
```

## Resources

* Docs: <https://spaier.github.io/spaier-ng-recaptcha/>
* Sample: <https://spaier.github.io/spaier-ng-recaptcha/tree/master/sample>
* Keys: <https://www.google.com/recaptcha/intro/index.html>
* Languages: <https://developers.google.com/recaptcha/docs/language>
* Invisible settings: <https://developers.google.com/recaptcha/docs/invisible#config>
* V2 settings: <https://developers.google.com/recaptcha/docs/display#config>
* V3 documentation: <https://developers.google.com/recaptcha/docs/v3>
* CoreModule: <https://angular.io/guide/styleguide#core-feature-module>
* SharedModule: <https://angular.io/guide/styleguide#shared-feature-module>

## License

MIT
