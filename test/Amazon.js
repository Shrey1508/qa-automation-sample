require('dotenv').config();
let { HEADLESS, WIDTH, HEIGHT } = process.env;

const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const Loginpage = require('./Loginpage');
const HomePage = require('./Homepage');

let page;
let loginpage;
let homepage;
let browser;
let productsInCart;

before(async () => {
	browser = await puppeteer.launch({
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
});

after(() => {
	console.log('browser closed');
	browser.close();
});

afterEach('Cleaning up the cart', async () => {
	productsInCart = await homepage.cartValue();

	if (productsInCart !== 0) {
		for (let cartItem = 0; cartItem < productsInCart; cartItem++) {
			await homepage.cartWindow();
			await homepage.emptyCart();
		}
	}
});

describe('first test in puppeter', function() {
	it('amazon login & 1 product add to cart', async () => {
		await loginpage.clkLoginBtn();

		productsInCart = await homepage.cartValue();
		expect(productsInCart).to.be.equal(0);

		await homepage.homeProduct();
		await homepage.mainProduct();
	});

	it('2 products add to cart and 1 remove from cart', async () => {
		await homepage.homeBtn();
		productsInCart = await homepage.cartValue();
		expect(productsInCart).to.be.equal(0);

		await homepage.homeProduct();
		await homepage.mainProduct();
		await homepage.homeBtn();
		await homepage.homeProduct();
		await homepage.mainProduct();

		await homepage.cartWindow();

		await homepage.emptyCart();

		productsInCart = await homepage.cartValue();
		expect(productsInCart).to.be.equal(1);
	});
});
