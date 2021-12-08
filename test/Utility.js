class Utility {
	async getRandom(product) {
		const random = Math.floor(Math.random() * product.length);
		return random;
	}

	async getSlice(addedProductNames) {
		const slicedNames = addedProductNames.slice(0, addedProductNames.length - 7).slice(8);
		return slicedNames;
	}
}
module.exports = Utility;
