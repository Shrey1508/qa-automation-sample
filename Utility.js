class Utility {
	async getrandom(product) {
		const random = Math.floor(Math.random() * (product.length - 1));
		return random;
	}
	async getrandomfinal(finalproduct) {
		const finalrandom = Math.floor(Math.random() * finalproduct.length);
		return finalrandom;
	}
}

module.exports = Utility;
