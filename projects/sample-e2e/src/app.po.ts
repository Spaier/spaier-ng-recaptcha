import { browser, by, element } from 'protractor'

export class AppPage {
  async navigateTo() {
    return browser.get('/')
  }
}
