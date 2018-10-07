# spaier-ng-recaptcha

[![Build Status](https://travis-ci.org/Spaier/spaier-ng-recaptcha.svg?branch=master)](https://travis-ci.org/Spaier/spaier-ng-recaptcha)
[![npm](https://img.shields.io/npm/v/spaier-ng-recaptcha.svg)](https://www.npmjs.com/package/spaier-ng-recaptcha)
[![npm](https://img.shields.io/npm/l/spaier-ng-recaptcha.svg)](https://www.npmjs.com/package/spaier-ng-recaptcha)
[![devDependencies](https://david-dm.org/spaier/spaier-ng-recaptcha/dev-status.svg)](https://david-dm.org/spaier/spaier-ng-recaptcha?type=dev)

## Prerequisites

Node and npm or yarn.

## Features

- Supports Angular forms.
- Supports required attribute.
- Supports V2(I'm not a robot and Invisible) and V3 reCAPTCHA.
- Supports dynamic updating.
- Supports loading script with `RecaptchaLoaderModule` or with a custom loader and provide `RecaptchaService`.

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

## Overview

## Usage

### Load script

Add `RecaptchaLoaderModule` to `CoreModule` or `AppModule`.

It provides `RecaptchaService`.

`language`: overrides default language.

`render`:
1. `RecaptchaRender.Explicit` doesn't render anything. Default.
2. `RecaptchaRender.Onload` renders the first element with `g-recaptcha` class.
3. `your_sitekey` renders isolated invisible reCAPTCHA that can be used from `RecaptchaService`. V3 best practice.

`onload`: specifies a function name on the window object. Defaults to `RecaptchaOnloadEventName = 'recaptchaloaded'`

`onloadFunc`: specifies a function that is executed after reCAPTCHA loads.

`recaptchaUrl`: script's url. Defaults to `RecaptchaGoogleUrl = 'https://www.google.com/recaptcha/api.js'`

```ts
export async function onLoad(recaptcha: Recaptcha) {
  // Sitekey Execution
  const result = await recaptcha.execute('your_sitekey', { action: 'background' })
  console.log(result)
}

@NgModule({
  imports: [
    // ...
    RecaptchaLoaderModule.withParameters({
      language: 'en',
      render: 'your_sitekey',
      onloadFunc: onLoad
    }), // loads script and allows to use `RecaptchaService`
    // ...
  ],
})
```

### RecaptchaService

Inject `RecaptchaService` and use provided `recaptcha$` observable or `recaptcha` object.
If you use `recaptcha` object be sure to check that reCAPTCHA library is loaded.

```ts
  constructor(private readonly recaptchaService: RecaptchaService) { }

  async execute() {
    // Observable
    const recaptcha = await this.recaptchaService.recaptcha$.toPromise()
    const result1 = await recaptcha.execute({ action: 'something' })
    // Value
    const result2 = await this.recaptchaService.recaptcha.execute({ action: 'something' })
  }
```

### RecaptchaDirective

- Add `RecaptchaDirectiveModule` to use `RecaptchaDirective` to any module that uses it or `SharedModule`.

Use it in your template:

```html
<select [(ngModel)]="theme">
  <option>dark</option>
  <option>light</option>
</select>
<select [(ngModel)]="size">
  <option>normal</option>
  <option>compact</option>
  <option>invisible</option>
</select>
<select [(ngModel)]="badge">
  <option>bottomright</option>
  <option>bottomleft</option>
  <option>inline</option>
  <option>none</option>
</select>
<input type="text" [(ngModel)]="language" />
<input type="text" [(ngModel)]="action" />
<div required #recaptcha="rcpRecaptcha" rcpRecaptcha data-sitekey="your_sitekey"
  [data-theme]="theme" [data-size]="size" [data-hl]="language" [data-badge]="badge" [data-action]="action"
  (data-callback)="onResolved($event)" (data-expired-callback)="onExpired()" (data-error-callback)="onError()">
</div>
<button type="button" [disabled]="recaptcha.size != 'invisible'" (click)="execute()">Execute</button>
<button type="button" (click)="reset()">Reset</button>
<button type="button" (click)="getResponse()">Get Response</button>
```
```ts
  @ViewChild('recaptcha') recaptcha: RecaptchaDirective
  theme = 'dark'
  size = 'normal'
  badge = 'none'
  language = 'en'
  action = 'form'

  async execute() {
    console.log('executed button: ' + await this.recaptcha.execute())
  }

  reset() {
    this.recaptcha.reset()
  }

  getResponse() {
    console.log('response: ' + this.recaptcha.getResponse())
  }

  onResolved(response: string) {
    console.log('callback: ' + response)
  }

  onError() {
    console.log('error')
  }

  onExpired() {
    console.log('expired')
  }
```


#### Forms

- Add `RecaptchaFormsModule` to use reCAPTCHA with `@angular/forms` to any module that uses it or `SharedModule`.

##### Template forms

```html
<form (ngSubmit)="onSubmit()" #form="ngForm">
  <div [(ngModel)]="captcha" name="captcha" required #recaptcha="rcpRecaptcha" rcpRecaptcha data-sitekey="your_sitekey"
    [data-theme]="theme" [data-size]="size" [data-hl]="language" [data-badge]="badge" [data-action]="action">
  </div>
  <button type="button" [disabled]="recaptcha.size != 'invisible'" (click)="execute()">Execute</button>
  <button type="button" (click)="reset()">Reset</button>
  <button type="button" (click)="getResponse()">Get Response</button>
  <button type="submit" [disabled]="!form.form.valid">Submit</button>
</form>
```

```ts
captcha: string

onSubmit() {
  console.log(captcha)
}
```

##### Reactive forms

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <div formControlName="captcha" required #recaptcha="rRecaptcha" rcpRecaptcha data-sitekey="your_sitekey"
    [data-theme]="theme" [data-size]="size" [data-hl]="language" [data-badge]="badge" [data-action]="action">
  </div>
  <button type="button" [disabled]="recaptcha.size != 'invisible'" (click)="execute()">Execute</button>
  <button type="button" (click)="reset()">Reset</button>
  <button type="button" (click)="getResponse()">Get Response</button>
  <button type="submit" [disabled]="!form.valid">Submit</button>
</form>
```

```ts
  form = this.fb.group({
    'captcha': ['', Validators.required]
  })

  constructor(private readonly fb: FormBuilder) { }

  onSubmit() {
    console.log(this.form.value)
  }
```

## Resources

* Docs: <https://spaier.github.io/spaier-ng-recaptcha>
* Sample: <https://github.io/spaier/spaier-ng-recaptcha/tree/master/projects/sample>
* Keys: <https://www.google.com/recaptcha/intro/index.html>
* reCAPTCHA: <https://developers.google.com/recaptcha/docs>
* CoreModule: <https://angular.io/guide/styleguide#core-feature-module>
* SharedModule: <https://angular.io/guide/styleguide#shared-feature-module>

## License

MIT
