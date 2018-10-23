import { RecaptchaDirectiveModule } from './recaptcha-directive.module'

describe('RecaptchaDirectiveModule', () => {
  let recaptchaDirectiveModule: RecaptchaDirectiveModule

  beforeEach(() => {
    recaptchaDirectiveModule = new RecaptchaDirectiveModule()
  })

  it('should create an instance', () => {
    expect(recaptchaDirectiveModule).toBeTruthy()
  })
})
