require("dotenv").config();

const puppeteerchrome = require("puppeteer");
const puppeteerfirefox = require("puppeteer-firefox");

const { USER_NAME, PASSWORD, BASE_URL } = process.env;

const login = {
  lgnbtn: "div.nav-line-1-container",
  email: "input#ap_email",
  cntbtn: "input#continue",
  pass: "input#ap_password",
  signIn: "input#signInSubmit",
};

(async () => {
  const test = async (browser) => {
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    await page.goto(BASE_URL);
    await page.click(login.lgnbtn, { setTimeout: 5000 });
    await page.waitForSelector(login.email);
    await page.type(login.email, USER_NAME);
    await page.click(login.cntbtn);
    await page.waitForSelector(login.pass);
    await page.type(login.pass, PASSWORD);
    await page.click(login.signIn);
    browser.close();
  };

  const chrome = await puppeteerchrome.launch({
    headless: false,
  });

  await test(chrome);

  const firefox = await puppeteerfirefox.launch({
    headless: false,
    args: ["-private"],
  });

  await test(firefox);
})();
