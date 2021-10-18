require("dotenv").config();

const puppeteer = require("puppeteer");

const { login, addToCart } = require("./locators");

let page;
let browser;

before(async () => {
  browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1500,
      height: 1000,
    },
    args: ["--start-fullscreen"],
  });
  page = await browser.newPage();
  await page.goto("https://www.amazon.in/");
});

after(() => {
  console.log("browser closed");
  browser.close();
});

describe("first describe block in puppeter", function () {
  it("amazon login", async () => {
    await page.click(login.lgnbtn);
    await page.waitForSelector(login.username, { timeout: 30000 });
    await page.type(login.username, process.env.UNAME);
    await page.click(login.cntbtn);
    await page.waitForSelector(login.pass, { timeout: 30000 });
    await page.type(login.pass, process.env.PAS);
    await page.click(login.signIn);
  });

  it("product add to cart", async () => {
    await page.waitForSelector(addToCart.productlinks);

    const product = await page.$$(addToCart.productlinks);
    await page.waitForTimeout(3000);
    await product[3].click();
    await page.waitForSelector(addToCart.addbtn);
    await page.click(addToCart.addbtn);
    await page.waitForSelector(addToCart.crtbtn);
    await page.click(addToCart.crtbtn);
  });
});
