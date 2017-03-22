import { OpensourcebillingPage } from './app.po';

describe('opensourcebilling App', () => {
  let page: OpensourcebillingPage;

  beforeEach(() => {
    page = new OpensourcebillingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('osb works!');
  });
});
