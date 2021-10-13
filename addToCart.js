const puppeteer = require("puppeteer");

const addToCart = {
  searchbox: "input#twotabsearchtextbox",
  searchbtn: "input#nav-search-submit-button",
  productlinks: `//*[@class='product-image _deals-shoveler-v2_style_dealImage__3nlqg']`,
  addbtn: "input#add-to-cart-button",
  crtbtn: "div#nav-cart-count-container",
};

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1500,
      height: 1000,
    },
    args: ["--start-fullscreen"],
  });
  const page = await browser.newPage();
  await page.goto("https://www.amazon.in/");
  await page.waitForXPath(addToCart.productlinks);

  const product = await page.$x(addToCart.productlinks);
  await product[2].click();

  await page.waitForSelector(addToCart.addbtn);
  await page.click(addToCart.addbtn);
  await page.waitForSelector(addToCart.crtbtn);
  await page.click(addToCart.crtbtn);
})();
