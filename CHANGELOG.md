# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- Use lowest possible versions in dependencies

## [1.1.1]

### Fixed

- Peer dependency errors in Angular 6
- Add optional `rxjs-compat` dependency for Angular 6

## [1.1.0]

### Added

- RecaptchaSize, RecaptchaTheme and RecaptchaType types.

### Removed

- @types/grecaptcha dependency

## [1.0.0]

### Added

- Set language with RecaptchaLoaderModule.withLanguage
- Configure recaptcha with RecaptchaModule.forRoot
- Implicit rendering option
- Language token
- Dynamic update of reCAPTCHA parameters and language

### Fixed

- Provide empty configs if none specified

[Unreleased]: https://github.com/Spaier/spaier-ng-recaptcha/compare/1.1.1...HEAD
[1.1.1]: https://github.com/Spaier/spaier-ng-recaptcha/compare/1.0.0...1.1.0
[1.1.0]: https://github.com/Spaier/spaier-ng-recaptcha/compare/1.0.0...1.1.0
