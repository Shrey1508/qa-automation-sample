class Utility {
	async getRandom(product) {
		const random = Math.floor(Math.random() * (product.length - 1));
		return random;
	}
	async getRandomFinal(finalproduct) {
		const finalrandom = Math.floor(Math.random() * finalproduct.length);
		return finalrandom;
	}
}

module.exports = Utility;
