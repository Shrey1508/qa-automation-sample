require("dotenv").config();

const { login } = require("./locators");

class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async clkLoginBtn() {
    await this.page.click(login.lgnbtn);
  }

  async typUserName(text) {
    await this.page.waitForSelector(login.username, { timeout: 30000 });
    await this.page.type(login.username, text);
    await this.page.click(login.cntbtn);
  }

  async typePass(text) {
    await this.page.waitForSelector(login.pass, { timeout: 30000 });
    await this.page.type(login.pass, text);
    await this.page.click(login.signIn);
  }

  async logOut() {
    await this.page.waitForTimeout(2000);
    await this.page.hover("div.nav-line-1-container");
    await this.page.waitForTimeout(2000);
    await this.page.click("#nav-item-signout");
  }
}

module.exports = LoginPage;
