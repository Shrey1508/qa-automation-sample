require("dotenv").config();

const { USER_NAME, PASSWORD, BASE_URL } = process.env;

const { login } = require("./locators");

class Loginpage {
  constructor(page) {
    this.page = page;
  }

  async clkLoginBtn(page) {
    await page.goto(BASE_URL);
    await page.click(login.lgnbtn);
    await page.waitForSelector(login.email, { timeout: 2000 });
    await page.type(login.email, USER_NAME, { Timeout: 2000 });
    await page.click(login.cntbtn);
    await page.waitForSelector(login.pass);
    await page.type(login.pass, PASSWORD);
    await page.click(login.signIn);
  }
}

module.exports = Loginpage;
