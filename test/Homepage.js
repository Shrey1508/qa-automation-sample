const Utility = require('./Utility');

const Home = {
	searchbox: 'input#twotabsearchtextbox',
	searchbtn: 'input#nav-search-submit-button',
	productlinks: `li.a-carousel-card.GridPresets-module__gridPresetElement_LK6M4HpuBZHEa3NTWKSb9`,
	finalproductlinks:
		'div.DealCard-module__card_1u9yKYV4EIA-fL4ibeMVIU.DealCard-module__cardWithoutActionButton_1K_FldevdoXxE8uy5pzBmr',
	hombtn: 'a#nav-logo-sprites',
	allproducts: 'div.a-section.octopus-dlp-image-shield',
	alldeals: 'a.a-link-normal.as-title-block-right.see-more.truncate-1line'
};

const utility = new Utility();

class Homepage {
	constructor(page) {
		this.page = page;
	}
	async selectRandomHomeProduct() {
		await this.page.waitForSelector(Home.alldeals, { visible: true });
		await this.page.click(Home.alldeals);
		await this.page.waitForSelector(Home.productlinks, { visible: true });
		const product = await this.page.$$(Home.productlinks);
		const homeProductRandom = await utility.getRandom(product);
		await this.page.waitForSelector(Home.productlinks, { visible: true });
		await product[homeProductRandom].click();
	}

	async selectRandomMainProduct() {
		await this.page.waitForSelector(Home.finalproductlinks, { visible: true });
		const product = await this.page.$$(Home.finalproductlinks);
		const mainProductRandom = await utility.getRandom(product);
		await product[mainProductRandom].click();
		await this.page.waitForSelector(Home.allproducts);
		await this.page.click(Home.allproducts);
	}
}
module.exports = { Homepage, Home: Home };
