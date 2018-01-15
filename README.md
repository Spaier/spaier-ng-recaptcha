# spaier-ng-recaptcha
[![Build Status](https://travis-ci.org/Spaier/spaier-ng-recaptcha.svg?branch=master)](https://travis-ci.org/Spaier/spaier-ng-recaptcha)
[![npm](https://img.shields.io/npm/v/spaier-ng-recaptcha.svg)](https://www.npmjs.com/package/spaier-ng-recaptcha)
[![npm](https://img.shields.io/npm/l/spaier-ng-recaptcha.svg)](https://www.npmjs.com/package/spaier-ng-recaptcha)
## Prerequisites

Node >= 8.9.4 and npm or yarn >= 1.3.2

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)

## Installation

```bash
npm install spaier-ng-recaptcha
```

or

```bash
yarn add spaier-ng-recaptcha
```


## Usage

0. Import RecaptchaLoaderModule and provide RecaptchaConfig in your AppModule or CoreModule.
```typescript
@NgModule({
	imports: [
        ...
		RecaptchaLoaderModule,
        ...
	],
    ...
	providers: [
        ...
		{ 
            // All settings for v2 https://developers.google.com/recaptcha/docs/display#config
            // All settings for invisible https://developers.google.com/recaptcha/docs/invisible#config
            provide: RecaptchaConfig, useValue: {
                // invisibleKey is used for size = 'invisible'
                // v2 is used for size = 'normal' or 'compact'
                invisibleKey = 'your invisible key',
			    v2Key = 'your v2 key'
                // Set other options
            }
        },
        ...
	]
})
export class CoreModule {
```
1. Add rcpRecaptcha directive to a html element.

```html
<div rcpRecaptcha></div>

```

2. Specify recaptcha parameters

```html
<div rcpRecaptcha size="normal" siteKey="another key?" type="audio" theme="dark"></div>
```

3. Reactive Forms

Html template

```html
<ng-container [formGroup]="someForm">
    <div rcpRecaptcha [formControlName]="someName"></div>
</ng-container>
```

4. Template Forms

```html
<div rcp [(ngModel)]="someModel"></div>
```

In your component
```typescript
someModel: string
```

## License

MIT
