import { Q7mobileWeUiPage } from './app.po';

describe('q7mobile-we-ui App', () => {
  let page: Q7mobileWeUiPage;

  beforeEach(() => {
    page = new Q7mobileWeUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
