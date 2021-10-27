const puppeteer = require("puppeteer");

const HomePage = require("./pages/HomePage");
const LoginPage = require("./pages/LoginPage");

describe("second describe block in puppeter", function () {
  let page;
  var homepage;
  var loginpage;
  let browser;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: true,
      defaultViewport: {
        width: 1500,
        height: 1000,
      },
      args: ["--start-fullscreen"],
    });
    page = await browser.newPage();
    await page.goto("https://www.amazon.in/");
    loginpage = new LoginPage(page);
    await loginpage.performLogin();
  });

  after(async () => {
    await loginpage.logOut();
    browser.close();
  });

  it("product add to cart", async () => {
    homepage = new HomePage(page);
    await homepage.clkOnProduct();
    await homepage.addCart();
    await homepage.clkOnCart();
    await page.waitForTimeout(3000);
    await page.screenshot({ path: "./images/cart.png" });
    await page.pdf({ path: "./pdf/new1.pdf", format: "a4" });
  });
});
