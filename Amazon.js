require('dotenv').config();
let { HEADLESS, WIDTH, HEIGHT } = process.env;
const bool = HEADLESS === 'true';

const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const Loginpage = require('./Loginpage');
const { HomePage, addToCart } = require('./Homepage');

let page;
var loginpage;
var homepage;

(async () => {
	const browser = await puppeteer.launch({
		headless: bool,
		defaultViewport: {
			width: Number(WIDTH),
			height: Number(HEIGHT)
		},
		args: [ '--start-fullscreen' ]
	});
	page = await browser.newPage();

	loginpage = new Loginpage(page);
	homepage = new HomePage(page);

	await loginpage.clkLoginBtn();
	let text = await page.$eval(addToCart.cart, (element) => element.textContent);
	let noofProducts = Number(text);

	if (noofProducts === 0) {
		await homepage.homeProduct();
		await homepage.mainProduct();
	} else {
		await homepage.cartWindow();

		for (i = 0; i < noofProducts; i++) {
			await homepage.emptyCart();
		}

		let text = await page.$eval(addToCart.cart, (element) => element.textContent);
		expect(text).to.be.equal('0');

		await homepage.homebtn();
		await homepage.homeProduct();
		await homepage.mainProduct();
	}

	//browser.close();
})();
