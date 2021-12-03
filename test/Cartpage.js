const { Home } = require('./Homepage');

const addToCart = {
	addbtn: 'input#add-to-cart-button',
	crtbtn: 'div#nav-cart-count-container',
	cart: 'span.nav-cart-count',
	del: 'input.a-color-link',
	productTitleWhileAdding: 'span#productTitle',
	productTitleInCart: 'span.a-truncate-cut',
	removeProductFromCart: (productName) => `//*[text()="${productName}"]/ancestor::div[4]//input[@value='Delete']`
};

class Cartpage {
	constructor(page) {
		this.page = page;
	}
	async productAddToCart() {
		await this.page.waitForSelector(addToCart.addbtn);
		await this.page.click(addToCart.addbtn);
		await this.page.waitForSelector(Home.hombtn, { visible: true });
	}

	async clickOnCartWindow() {
		await this.page.waitForSelector(addToCart.crtbtn);
		await this.page.click(addToCart.crtbtn);
	}

	async delProduct() {
		await this.page.waitForSelector(addToCart.del);
		await this.page.click(addToCart.del);
		await this.page.waitForSelector(Home.hombtn);
	}

	async clkOnHomeBtn() {
		await this.page.click(Home.hombtn);
	}

	async getCartValue() {
		await this.page.waitForSelector(addToCart.cart, { visible: true });
		const text = await this.page.$eval(addToCart.cart, (element) => element.textContent);
		const noofProducts = Number(text);
		return noofProducts;
	}

	async getTextWhileAddingProductToCart() {
		await this.page.waitForSelector(addToCart.productTitleWhileAdding, { visible: true });
		const title = await this.page.$eval(addToCart.productTitleWhileAdding, (el) => el.textContent);
		return title;
	}

	async getTextProductInTheCart() {
		await this.page.waitForSelector(addToCart.productTitleInCart, { visible: true });
		const productTitle = await this.page.$$eval(addToCart.productTitleInCart, (elmnts) =>
			elmnts.map((item) => item.textContent)
		);
		return productTitle;
	}

	async delProductByName(productName) {
		await this.page.waitForSelector(addToCart.del);
		const removeProductByName = await this.page.$x(addToCart.removeProductFromCart(productName));
		await removeProductByName[0].click();
	}
}
module.exports = Cartpage;
