const puppeteer = require("puppeteer");

const login = {
  lgnbtn: "div.nav-line-1-container",
};

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.amazon.in/");
  await page.click(login.lgnbtn);
})();
