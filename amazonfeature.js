require("dotenv").config();

const puppeteer = require("puppeteer");

const { USER_NAME, PASSWORD, BASE_URL } = process.env;

const login = {
  lgnbtn: "div.nav-line-1-container",
  email: "input#ap_email",
  cntbtn: "input#continue",
  pass: "input#ap_password",
  signIn: "input#signInSubmit",
};

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(BASE_URL);
  await page.click(login.lgnbtn);
  await page.waitForSelector(login.email);
  await page.type(login.email, USER_NAME);
  await page.click(login.cntbtn);
  await page.waitForSelector(login.pass);
  await page.type(login.pass, PASSWORD);
  await page.click(login.signIn);
})();
