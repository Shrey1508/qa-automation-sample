require("dotenv").config();

const { login } = require("./locators");

const { USER_NAME, PASSWORD } = process.env;

class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async clkLoginBtn() {
    await this.page.click(login.lgnbtn);
  }

  async typUserName() {
    await this.page.waitForSelector(login.username, { timeout: 3000 });
    await this.page.type(login.username, USER_NAME, {
      timeout: 2000,
    });
    await this.page.click(login.cntbtn);
  }

  async typePass() {
    await this.page.waitForSelector(login.pass, { timeout: 3000 });
    await this.page.type(login.pass, PASSWORD);
    await this.page.click(login.signIn);
  }

  async logOut() {
    await this.page.waitForTimeout(3000);
    await this.page.hover("div.nav-line-1-container");
    await this.page.waitForTimeout(2000);
    await this.page.click("#nav-item-signout");
  }

  async performLogin() {
    await this.clkLoginBtn();
    await this.typUserName();
    await this.typePass();
  }
}

module.exports = LoginPage;
