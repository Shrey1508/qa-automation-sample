require("dotenv").config();

const puppeteer = require("puppeteer");

const { login } = require("./locators");

const expect = require("chai").expect;

describe("first test in puppeter", function () {
  it("amazon login", async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://www.amazon.in/");
    await page.click(login.lgnbtn);
    await page.waitForSelector(login.username, { timeout: 30000 });
    await page.type(login.username, process.env.UNAME);
    await page.click(login.cntbtn);
    await page.waitForSelector(login.pass, { timeout: 30000 });
    await page.type(login.pass, process.env.PAS);
    await page.click(login.signIn);
    browser.close();
  });
});
