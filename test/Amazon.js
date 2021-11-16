require('dotenv').config();
let { HEADLESS, WIDTH, HEIGHT } = process.env;

const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const Loginpage = require('./Loginpage');
const HomePage = require('./Homepage');
const assert = require('assert');

let page;
let loginpage;
let homepage;
let browser;
let productsInCart;
const addedProductNames = [];
const cartProductNames = [];

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
	productsInCart = await homepage.getCartValue();

	if (productsInCart !== 0) {
		for (let cartItem = 0; cartItem < productsInCart; cartItem++) {
			await homepage.clickOnCartWindow();
			await homepage.delProduct();
		}
	}
});

describe('first test in puppeter', function() {
	it('amazon login & 1 product add to cart', async () => {
		await loginpage.clkLoginBtn();

		productsInCart = await homepage.getCartValue();
		expect(productsInCart).to.be.equal(0);

		await homepage.selectRandomHomeProduct();
		await homepage.selectRandomMainProduct();
		await homepage.productAddToCart();
	});

	it('2 products add to cart and 1 remove from cart', async () => {
		await homepage.clkOnHomeBtn();
		productsInCart = await homepage.getCartValue();
		expect(productsInCart).to.be.equal(0);

		for (let i = 0; i < 2; i++) {
			await homepage.selectRandomHomeProduct();
			await homepage.selectRandomMainProduct();
			addedProductNames[i] = await homepage.getTextWhileAddingProductToCart();
			addedProductNames[i] = addedProductNames[i].slice(0, addedProductNames[i].length - 7).slice(8);
			await homepage.productAddToCart();
			cartProductNames[i] = await homepage.getTextProductInTheCart();
			await homepage.clkOnHomeBtn();
			assert.equal(cartProductNames[i].includes(addedProductNames[i]), true, 'Product is not added to cart');
		}

		await homepage.clickOnCartWindow();

		await homepage.delProductByName(cartProductNames[0]);
		await page.waitForTimeout(2000);

		productsInCart = await homepage.getCartValue();

		assert.equal(productsInCart, 1, 'your product is not deleted');
	});
});
