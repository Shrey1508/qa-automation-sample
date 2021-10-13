require("dotenv").config();

const puppeteer = require("puppeteer");

// let uname = process.env.UNAME;
// let pas = process.env.PAS;

const login = {
  lgnbtn: "div.nav-line-1-container",
  username: "input#ap_email",
  cntbtn: "input#continue",
  pass: "input#ap_password",
  signIn: "input#signInSubmit",
};

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.amazon.in/");
  await page.click(login.lgnbtn);
  await page.waitForSelector(login.username);
  await page.type(login.username, process.env.UNAME);
  await page.click(login.cntbtn);
  await page.waitForSelector(login.pass);
  await page.type(login.pass, process.env.PAS);
  await page.click(login.signIn);
})();
