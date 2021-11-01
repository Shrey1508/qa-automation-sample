const login = {
	lgnbtn: 'div.nav-line-1-container',
	email: 'input#ap_email',
	cntbtn: 'input#continue',
	pass: 'input#ap_password',
	signIn: 'input#signInSubmit'
};

const addToCart = {
	searchbox: 'input#twotabsearchtextbox',
	searchbtn: 'input#nav-search-submit-button',
	productlinks: `//*[@class='product-image _deals-shoveler-v2_style_dealImage__3nlqg']`,
	addbtn: 'input#add-to-cart-button',
	crtbtn: 'div#nav-cart-count-container',
	finalproductlinks: 'div.a-section.octopus-dlp-image-shield',
	cart: 'span.nav-cart-count',
	del: 'input.a-color-link',
	homebtn: 'a#nav-logo-sprites'
};

module.exports = { login: login, addToCart: addToCart };
