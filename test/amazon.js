const puppeteer = require("puppeteer");

const LoginPage = require("./pages/LoginPage");

var loginpage;
let page;

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

  loginpage = new LoginPage(page);
});

after(() => {
  console.log("browser closed");
  browser.close();
});

describe("first describe block in puppeter", function () {
  it("amazon login", async () => {
    await loginpage.performLogin();
    await page.waitForTimeout(3000);
    await loginpage.logOut();
    await page.close();
  });
});
