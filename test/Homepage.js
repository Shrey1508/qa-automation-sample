const Utility = require('./Utility');

const Home = {
	searchbox: 'input#twotabsearchtextbox',
	searchbtn: 'input#nav-search-submit-button',
	productlinks: `li.a-carousel-card.GridPresets-module__gridPresetElement_LK6M4HpuBZHEa3NTWKSb9`,
	finalproductlinks: `//*[@class='a-section a-spacing-none ameyal-product-shoveler']/ancestor::div[2]/div[2]//*[@class='feed-carousel-card']`,
	hombtn: 'a#nav-logo-sprites',
	allproducts: 'div.a-section.octopus-dlp-image-shield',
	alldeals: 'a.a-link-normal.as-title-block-right.see-more.truncate-1line'
};

const utility = new Utility();

class Homepage {
	constructor(page) {
		this.page = page;
	}

	async selectRandomMainProduct() {
		await this.page.waitForXPath(Home.finalproductlinks, { visible: true });
		const product = await this.page.$x(Home.finalproductlinks);
		const mainProductRandom = await utility.getRandom(product);
		await product[mainProductRandom].click();
	}

	async getSrcAttribute(srcLocator) {
		const src = await this.page.$eval(srcLocator, (links) => links.getAttribute('href'));
		return src;
	}
}
module.exports = { Homepage, Home: Home };
