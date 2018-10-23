import { RecaptchaFormsModule } from './recaptcha-forms.module'

describe('RecaptchaFormsModule', () => {
  let recaptchaFormsModule: RecaptchaFormsModule

  beforeEach(() => {
    recaptchaFormsModule = new RecaptchaFormsModule()
  })

  it('should create an instance', () => {
    expect(recaptchaFormsModule).toBeTruthy()
  })
})
