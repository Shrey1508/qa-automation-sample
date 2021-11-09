class Utility {
	async getRandom(product) {
		const random = Math.floor(Math.random() * product.length);
		return random;
	}
}
module.exports = Utility;
