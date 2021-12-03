require('dotenv').config();
let { HEADLESS, WIDTH, HEIGHT } = process.env;

const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const Loginpage = require('./Loginpage');
const { Homepage } = require('./Homepage');
const Cartpage = require('./Cartpage');
const Utility = require('./Utility');
const assert = require('assert');

let page;
let loginpage;
let homepage;
let cartpage;
let browser;

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
	homepage = new Homepage(page);
	cartpage = new Cartpage(page);
});

after(() => {
	console.log('browser closed');
	browser.close();
});

afterEach('Cleaning up the cart', async () => {
	productsInCart = await cartpage.getCartValue();

	if (productsInCart !== 0) {
		for (let cartItem = 0; cartItem < productsInCart; cartItem++) {
			await cartpage.clickOnCartWindow();
			await cartpage.delProduct();
		}
	}
});

describe('first test in puppeter', function() {
	const utility = new Utility();

	it('amazon login & 1 product add to cart', async () => {
		await loginpage.clkLoginBtn();

		let productsInCart = await cartpage.getCartValue();
		expect(productsInCart).to.be.equal(0);

		await homepage.selectRandomMainProduct();
		let addedProductNames = await cartpage.getTextWhileAddingProductToCart();
		addedProductNames = addedProductNames.slice(0, addedProductNames.length - 7).slice(8);

		await cartpage.productAddToCart();
		await cartpage.clickOnCartWindow();
		const cartProductNames = await cartpage.getTextProductInTheCart();

		assert.equal(addedProductNames.includes(cartProductNames), true, 'Product is not added to cart');
	});

	it('2 products add to cart and 1 remove from cart', async () => {
		let addedProductNames = [];
		let cartProductNames;

		await cartpage.clkOnHomeBtn();
		let productsInCart = await cartpage.getCartValue();
		expect(productsInCart).to.be.equal(0);

		for (let i = 0; i < 2; i++) {
			await homepage.selectRandomMainProduct();
			addedProductNames[i] = await cartpage.getTextWhileAddingProductToCart();
			addedProductNames[i] = addedProductNames[i].slice(0, addedProductNames[i].length - 7).slice(8);
			await cartpage.productAddToCart();
			await cartpage.clkOnHomeBtn();
		}

		await cartpage.clickOnCartWindow();
		cartProductNames = await cartpage.getTextProductInTheCart();
		const product = cartProductNames;

		assert.equal(
			addedProductNames.every((addedProductName) => cartProductNames.includes(addedProductName)),
			true,
			'Product is not added to cart'
		);

		await cartpage.clickOnCartWindow();

		const delRandom = await utility.getRandom(product);

		const temp = cartProductNames[delRandom];

		await cartpage.delProductByName(cartProductNames[delRandom]);

		cartProductNames.length = 0;

		productsInCart = await cartpage.getCartValue();
		for (i = 0; i < productsInCart; i++) {
			cartProductNames[i] = await cartpage.getTextProductInTheCart();
		}

		assert.equal(cartProductNames.includes(temp), false, 'your product is not deleted');
	});
});
