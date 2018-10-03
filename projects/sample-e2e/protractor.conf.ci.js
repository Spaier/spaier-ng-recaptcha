const puppeteer = require('puppeteer')
const config = require('./protractor.conf').config

config.capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    args: ['--headless', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
    binary: puppeteer.executablePath()
  }
}

exports.config = config
