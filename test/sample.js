const HomePage = require("./pages/HomePage");
const LoginPage = require("./pages/LoginPage");

describe("second describe block in puppeter", function () {
  let page;
  var homepage;
  var loginpage;

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://www.amazon.in/");
    loginpage = new LoginPage(page);
    await loginpage.performLogin();
  });

  after(async () => {
    loginpage = new LoginPage(page);
    await loginpage.logOut();
  });

  it("product add to cart", async () => {
    homepage = new HomePage(page);
    await homepage.clkOnProduct();
    await homepage.addCart();
    await homepage.clkOnCart();
  });
});
