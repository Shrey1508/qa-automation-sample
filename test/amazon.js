require("dotenv").config();

const puppeteer = require("puppeteer");

const HomePage = require("./pages/HomePage");

const LoginPage = require("./pages/LoginPage");

describe("first describe block in puppeter", function () {
  let page;
  let browser;
  var homepage;
  var loginpage;

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

    homepage = new HomePage(page);
    loginpage = new LoginPage(page);
  });

  after(async () => {
    await loginpage.logOut();
    console.log("browser closed");
    browser.close();
  });

  it("amazon login", async () => {
    await loginpage.clkLoginBtn();
    await loginpage.typUserName(process.env.UNAME);
    await loginpage.typePass(process.env.PAS);
  });

  it("product add to cart", async () => {
    await homepage.clkOnProduct();
    await homepage.addCart();
    await homepage.clkOnCart();
  });
});
