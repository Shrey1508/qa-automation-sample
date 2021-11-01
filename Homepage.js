const { addToCart } = require('./locators');

class Homepage {
	constructor(page) {
		this.page = page;
	}
	async homeProduct(page) {
		await page.waitForXPath(addToCart.productlinks);
		const product = await page.$x(addToCart.productlinks);
		const random = Math.floor(Math.random() * (product.length - 1));
		await page.waitForTimeout(2000);
		await product[random].click();
		await page.waitForTimeout(2000);
	}

	async mainProduct(page) {
		const finalproduct = await page.$$(addToCart.finalproductlinks);
		const finalrandom = Math.floor(Math.random() * finalproduct.length);
		await finalproduct[finalrandom].click();
		await page.waitForSelector(addToCart.addbtn);
		await page.click(addToCart.addbtn);
		await page.waitForSelector(addToCart.crtbtn);
		await page.click(addToCart.crtbtn);
	}
}
module.exports = Homepage;
