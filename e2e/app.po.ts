import { browser, element, by } from 'protractor';

export class OpensourcebillingPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('osb-root h1')).getText();
  }
}
