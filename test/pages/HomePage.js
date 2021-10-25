const { addToCart } = require("./locators");

class HomePage {
  constructor(page) {
    this.page = page;
  }

  async getTitle() {
    return this.page.title();
  }

  async clkOnProduct() {
    await this.page.waitForSelector(addToCart.productlinks);
    const product = await this.page.$$(addToCart.productlinks);
    await this.page.waitForTimeout(3000);
    await product[1].click();
  }

  async addCart() {
    await this.page.waitForSelector(addToCart.addbtn);
    await this.page.click(addToCart.addbtn);
  }

  async clkOnCart() {
    await this.page.waitForSelector(addToCart.crtbtn);
    await this.page.click(addToCart.crtbtn);
  }
}

module.exports = HomePage;
