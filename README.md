# spaier-ng-recaptcha

## Prerequisites

Node >= 8.9.3 and npm or yarn >= 1.3.2

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)

## Installation

```
npm install spaier-ng-recaptcha
```

or

```
yarn add spaier-ng-recaptcha
```


## Usage

0. Import RecaptchaLoaderModule and provide RecaptchaConfig in your AppModule or CoreModule.
```
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

```
<div rcpRecaptcha></div>

```

2. Specify recaptcha parameters

```
<div rcpRecaptcha size="normal" siteKey="another key?" type="audio" theme="dark"></div>
```

3. Reactive Forms

Html template

```
<ng-container [formGroup]="someForm">
    <div rcpRecaptcha [formControlName]="someName"></div>
</ng-container>
```

4. Template Forms

```
<div rcp [(ngModel)]="someModel">
```

In your component
```
someModel: string
```

## License

MIT
