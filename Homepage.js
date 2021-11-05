const Utility = require('./Utility');

const addToCart = {
	searchbox: 'input#twotabsearchtextbox',
	searchbtn: 'input#nav-search-submit-button',
	productlinks: `//*[@class='product-image _deals-shoveler-v2_style_dealImage__3nlqg']`,
	addbtn: 'input#add-to-cart-button',
	crtbtn: 'div#nav-cart-count-container',
	finalproductlinks: 'div.a-section.octopus-dlp-image-shield',
	cart: 'span.nav-cart-count',
	del: 'input.a-color-link',
	hombtn: 'a#nav-logo-sprites'
};

var utility = new Utility();

class HomePage {
	constructor(page) {
		this.page = page;
	}
	async homeProduct() {
		await this.page.waitForXPath(addToCart.productlinks, { visible: true });
		const product = await this.page.$x(addToCart.productlinks);
		const ran = await utility.getrandom(product);
		await this.page.waitForXPath(addToCart.productlinks);
		await product[ran].click();
	}

	async mainProduct() {
		await this.page.waitForSelector(addToCart.finalproductlinks, { visible: true });
		const finalproduct = await this.page.$$('div.a-section.octopus-dlp-image-shield');
		const fr = await utility.getrandomfinal(finalproduct);
		await finalproduct[fr].click();
		await this.page.waitForSelector(addToCart.addbtn);
		await this.page.click(addToCart.addbtn);
		await this.page.waitForSelector(addToCart.crtbtn);
		await this.page.click(addToCart.crtbtn);
	}

	async cartWindow() {
		await this.page.waitForSelector(addToCart.crtbtn);
		await this.page.click(addToCart.crtbtn);
	}

	async emptyCart() {
		await this.page.waitForSelector(addToCart.del);
		await this.page.click(addToCart.del);
		await this.page.waitForSelector(addToCart.hombtn);
	}

	async homebtn() {
		await this.page.click(addToCart.hombtn);
	}
}
module.exports = { HomePage, addToCart: addToCart };
