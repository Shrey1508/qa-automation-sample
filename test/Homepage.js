const Utility = require('./Utility');

const addToCart = {
	searchbox: 'input#twotabsearchtextbox',
	searchbtn: 'input#nav-search-submit-button',
	productlinks: `li.a-carousel-card.GridPresets-module__gridPresetElement_LK6M4HpuBZHEa3NTWKSb9`,
	addbtn: 'input#add-to-cart-button',
	crtbtn: 'div#nav-cart-count-container',
	finalproductlinks:
		'div.DealCard-module__card_1u9yKYV4EIA-fL4ibeMVIU.DealCard-module__cardWithoutActionButton_1K_FldevdoXxE8uy5pzBmr',
	cart: 'span.nav-cart-count',
	del: 'input.a-color-link',
	hombtn: 'a#nav-logo-sprites',
	allproducts: 'div.a-section.octopus-dlp-image-shield',
	alldeals: 'a.a-link-normal.as-title-block-right.see-more.truncate-1line'
};

const utility = new Utility();

class HomePage {
	constructor(page) {
		this.page = page;
	}
	async homeProduct() {
		await this.page.waitForSelector(addToCart.alldeals, { visible: true });
		await this.page.click(addToCart.alldeals);
		await this.page.waitForSelector(addToCart.productlinks, { visible: true });
		const product = await this.page.$$(addToCart.productlinks);
		const homeProductRandom = await utility.getRandom(product);
		await this.page.waitForSelector(addToCart.productlinks, { visible: true });
		await product[homeProductRandom].click();
	}

	async mainProduct() {
		await this.page.waitForSelector(addToCart.finalproductlinks, { visible: true });
		const product = await this.page.$$(addToCart.finalproductlinks);
		const mainProductRandom = await utility.getRandom(product);
		await product[mainProductRandom].click();
		await this.page.waitForSelector(addToCart.allproducts);
		await this.page.click(addToCart.allproducts);
		await this.page.waitForSelector(addToCart.addbtn);
		await this.page.click(addToCart.addbtn);
		await this.page.waitForSelector(addToCart.crtbtn);
		await this.page.click(addToCart.crtbtn);
		await this.page.waitForSelector(addToCart.hombtn, { visible: true });
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

	async homeBtn() {
		await this.page.click(addToCart.hombtn);
	}

	async cartValue() {
		await this.page.waitForSelector(addToCart.cart, { visible: true });
		const text = await this.page.$eval(addToCart.cart, (element) => element.textContent);
		const noofProducts = Number(text);
		return noofProducts;
	}
}
module.exports = HomePage;
