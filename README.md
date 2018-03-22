# spaier-ng-recaptcha
[![Build Status](https://travis-ci.org/Spaier/spaier-ng-recaptcha.svg?branch=master)](https://travis-ci.org/Spaier/spaier-ng-recaptcha)
[![npm](https://img.shields.io/npm/v/spaier-ng-recaptcha.svg)](https://www.npmjs.com/package/spaier-ng-recaptcha)
[![npm](https://img.shields.io/npm/l/spaier-ng-recaptcha.svg)](https://www.npmjs.com/package/spaier-ng-recaptcha)
## Prerequisites

Node >= 8.10.0 and npm or yarn >= 1.5.1

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
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

## Usage

1. Get reCAPTCHA api keys here: https://www.google.com/recaptcha/intro/index.html.

2. Import RecaptchaModule in your SharedModule (https://angular.io/guide/styleguide#shared-feature-module).

```typescript
import { RecaptchaModule } from 'spaier-ng-recaptcha'

const MODULES = [
    // Other modules
    RecaptchaModule
    // Other modules
]

@NgModule({
    imports: [...MODULES],
    exports: [...MODULES]
})
export class SharedModule { }
```

3. Setup CoreModule or AppModule (https://angular.io/guide/styleguide#core-feature-module).

Provide RecaptchaLoaderModule and RecaptchaConfig with api keys.
Optionally provide default properties for recaptcha and language.

All settings for v2 recaptcha - https://developers.google.com/recaptcha/docs/display#config

All settings for invisible recaptcha - https://developers.google.com/recaptcha/docs/invisible#config

Language codes - 
https://developers.google.com/recaptcha/docs/language

+ Variant A.

```typescript
import {RecaptchaLoaderModule, RecaptchaModule } from 'spaier-ng-recaptcha'

@NgModule({
	imports: [
        // Other imports
        RecaptchaLoaderModule.withLanguage("en"),
        RecaptchaModule.forRoot({
            // invisibleKey is used for size = 'invisible'
            // v2Key is used for size = 'normal' or 'compact'
            invisibleKey = 'your invisible key',
			v2Key = 'your v2 key',
            // Optionally set other options
            size = 'normal',
            theme = 'dark',
            badge = 'bottomleft'
        }),
        // Other imports
	]
})
export class CoreModule { }
```

+ Variant B.

```typescript
import { RecaptchaConfig, RecaptchaLoaderModule, RECAPTCHA_LANGUAGE } from 'spaier-ng-recaptcha'

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
            provide: RecaptchaConfig, useValue: {
                // invisibleKey is used for size = 'invisible'
                // v2Key is used for size = 'normal' or 'compact'
                invisibleKey = 'your invisible key',
			    v2Key = 'your v2 key',
                // Optionally set other parameters
                size = 'invisible',
                theme = 'light',
                badge = 'bottomleft'
            }
        },
        { provide: RECAPTCHA_LANGUAGE, useValue: "en" }
        ...
	]
})
export class CoreModule { }
```
4. Use it.

```html
<div (recaptchaOnResolved)="onResolved($event)" (recaptchaOnExpired)="onExpired()" (recaptchaOnReset)="onReset()"
    #v2="rcpRecaptcha" rcpRecaptcha size="normal" <!-- siteKey="another key?" --> type="audio" theme="dark">
</div>
<div (recaptchaOnResolved)="onResolved($event)" (recaptchaOnExpired)="onExpired()" (recaptchaOnReset)="onReset()"
    #invisible="rcpRecaptcha" rcpRecaptcha size="invisible" badge="inline">
</div>
<button (click)="invisible.execute()">Execute Invisible</button>
<button (click)="invisible.reset()">Reset Invisible</button>
<button (click)="v2.reset()">Reset V2</button>
```

```typescript
export class CoolComponent {

    onResolved(response: string) {
        console.log(response)
    }

    onReset() {
        console.log('reset was called')
    }

    onExpired() {
        console.log('recaptcha has expired')
    }
}
```

5. Reactive Forms

```html
<ng-container [formGroup]="someForm">
    <div required rcpRecaptcha [formControlName]="someName"></div>
</ng-container>
```

```typescript
export class CoolComponent {
    onSubmit(formValue) {
        // Do something
    }
}
```

6. Template Forms

```html
<form (ngSubmit)="onSubmit()">
    <div required rcpRecaptcha [(ngModel)]="response"></div>
</form>
```

In your component
```typescript
export class CoolComponent {

    response: string

    onSubmit() {
        // Do something
    }
}
```

## Resources

* Docs: https://spaier.github.io/spaier-ng-recaptcha/ 

## License

MIT
