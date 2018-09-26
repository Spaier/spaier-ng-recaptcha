# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.1]

### Changed

- Update docs

## [2.0.0]

### Added

- Add `RecaptchaDirectiveModule`. 
- Add `RecaptchaFormsModule`
- `@angular/forms` is now an optional dependency
- Add V3 Support
- Add render, url, onload, onloadFunc parameters to `RecaptchaLoaderModule`
- Add `RecaptchaType`, `RecaptchaTheme`, `RecaptchaSize`, `RecaptchaBadge` enums

### Changed

- Updated type definitions
- Object parameter is used in `RecaptchaLoaderModule.withParameters`
- Rename `RecaptchaLoaderService` to `RecaptchaService`
- `RecaptchaDirective` now uses `data-*` attributes. Example: `data-theme` instead of `theme`.

### Removed

- `RecaptchaModule`

### Fixed

- `RecaptchaDirective` attributes were undefined or null on `ngOnInit`
- Use renderer2 to add script tag

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

[Unreleased]: https://github.com/Spaier/spaier-ng-recaptcha/compare/2.0.1...HEAD
[2.0.1]: https://github.com/Spaier/spaier-ng-recaptcha/compare/2.0.0...2.0.1
[2.0.0]: https://github.com/Spaier/spaier-ng-recaptcha/compare/1.1.0...2.0.0
[1.1.1]: https://github.com/Spaier/spaier-ng-recaptcha/compare/1.0.0...1.1.0
[1.1.0]: https://github.com/Spaier/spaier-ng-recaptcha/compare/1.0.0...1.1.0
