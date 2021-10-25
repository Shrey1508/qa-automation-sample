require("dotenv").config();

const puppeteer = require("puppeteer");

let username = process.env.UNAME;
let password = process.env.PAS;

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
  await page.goto("https://www.amazon.in/");
  await page.click(login.lgnbtn);
  await page.waitForSelector(login.email);
  await page.type(login.email, username);
  await page.click(login.cntbtn);
  await page.waitForSelector(login.pass);
  await page.type(login.pass, password);
  await page.click(login.signIn);
})();
