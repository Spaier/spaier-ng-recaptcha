import { RecaptchaLoaderModule } from './recaptcha-loader.module'

describe('RecaptchaLoaderModule', () => {
  let recaptchaLoaderModule: RecaptchaLoaderModule

  beforeEach(() => {
    recaptchaLoaderModule = new RecaptchaLoaderModule()
  })

  it('should create an instance', () => {
    expect(recaptchaLoaderModule).toBeTruthy()
  })
})
