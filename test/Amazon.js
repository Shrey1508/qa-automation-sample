require('dotenv').config();
let { HEADLESS, WIDTH, HEIGHT } = process.env;

const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const Loginpage = require('./Loginpage');
const { Homepage } = require('./Homepage');
const Cartpage = require('./Cartpage');
const Utility = require('./Utility');
const assert = require('assert');

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
	let page = await browser.newPage();

	loginpage = new Loginpage(page);
	homepage = new Homepage(page);
	cartpage = new Cartpage(page);

	await loginpage.clkLoginBtn();
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
		let productsInCart = await cartpage.getCartValue();
		expect(productsInCart).to.be.equal(0);

		await homepage.selectRandomMainProduct();
		let addedProductNames = await cartpage.getTextWhileAddingProductToCart();
		addedProductNames = await utility.getSlice(addedProductNames);

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
			addedProductNames[i] = await utility.getSlice(addedProductNames[i]);
			await cartpage.productAddToCart();
			await cartpage.clkOnHomeBtn();
		}

		await cartpage.clickOnCartWindow();
		cartProductNames = await cartpage.getTextProductInTheCart();

		assert.equal(
			addedProductNames.every((addedProductName) => cartProductNames.includes(addedProductName)),
			true,
			'Product is not added to cart'
		);

		await cartpage.clickOnCartWindow();

		const delRandom = await utility.getRandom(cartProductNames);

		const deletedProduct = cartProductNames[delRandom];

		await cartpage.delProductByName(deletedProduct);

		cartProductNames = await cartpage.getTextProductInTheCart();

		assert.equal(cartProductNames.includes(deletedProduct), false, 'your product is not deleted');
	});
});
