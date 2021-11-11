require('dotenv').config();
let { HEADLESS, WIDTH, HEIGHT } = process.env;

const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const Loginpage = require('./Loginpage');
const HomePage = require('./Homepage');

let page;
let loginpage;
let homepage;

(async () => {
	const browser = await puppeteer.launch({
		headless: JSON.parse(HEADLESS.toLowerCase()),
		defaultViewport: {
			width: parseInt(WIDTH),
			height: parseInt(HEIGHT)
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

		for (cartItem = 0; cartItem < productsInCart; cartItem++) {
			await homepage.emptyCart();
		}

		productsInCart = await homepage.cartValue();
		expect(productsInCart).to.be.equal(0);

		await homepage.homeBtn();
		await homepage.homeProduct();
		await homepage.mainProduct();
	}
	productsInCart = await homepage.cartValue();
	expect(productsInCart).to.be.equal(1);

	browser.close();
})();
