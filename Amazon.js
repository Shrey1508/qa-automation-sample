require('dotenv').config();
let { HEADLESS, WIDTH, HEIGHT } = process.env;

const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const Loginpage = require('./Loginpage');
const HomePage = require('./Homepage');

let page;
var loginpage;
var homepage;

expect(true).to.satisfy(() => {
	if (HEADLESS === 'true' || HEADLESS === 'false') {
		return true;
	} else {
		console.log('Invalid Input(Put either true or false in HEADLESS)');
	}
});

(async () => {
	const browser = await puppeteer.launch({
		headless: HEADLESS === 'true',
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
	let productsInCart = await homepage.cartValue();

	if (productsInCart === 0) {
		await homepage.homeProduct();
		await homepage.mainProduct();
	} else {
		await homepage.cartWindow();

		for (i = 0; i < productsInCart; i++) {
			await homepage.emptyCart();
		}

		productsInCart = await homepage.cartValue();
		expect(productsInCart).to.be.equal(0 && 1);

		await homepage.homeBtn();
		await homepage.homeProduct();
		await homepage.mainProduct();
	}

	browser.close();
})();
