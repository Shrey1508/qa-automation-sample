require('dotenv').config();
let { HEADLESS, WIDTH, HEIGHT } = process.env;
const bool = HEADLESS === 'true';
WIDTH = Number(WIDTH);
HEIGHT = Number(HEIGHT);

const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const Loginpage = require('./Loginpage');
const Homepage = require('./Homepage');
const { addToCart } = require('./locators');

let page;

var loginpage = new Loginpage();
var homepage = new Homepage();

(async () => {
	const browser = await puppeteer.launch({
		headless: bool,
		defaultViewport: {
			width: WIDTH,
			height: HEIGHT
		},
		args: [ '--start-fullscreen' ]
	});
	page = await browser.newPage();

	await loginpage.clkLoginBtn(page);
	await page.waitForTimeout(3000);
	let text = await page.$eval(addToCart.cart, (element) => element.textContent);
	let noofProducts = Number(text);

	if (noofProducts === 0) {
		await homepage.homeProduct(page);
		await homepage.mainProduct(page);
	} else {
		await page.waitForSelector(addToCart.crtbtn);
		await page.click(addToCart.crtbtn);

		for (i = 0; i < noofProducts; i++) {
			await page.waitForTimeout(2000);
			await page.click(addToCart.del);
		}

		let text = await page.$eval(addToCart.cart, (element) => element.textContent);
		expect(text).to.be.equal('0');
		await page.click(addToCart.homebtn);
		await page.waitForTimeout(2000);

		await homepage.homeProduct(page);
		await homepage.mainProduct(page);
	}

	browser.close();
})();
