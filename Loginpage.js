require('dotenv').config();

const { USER_NAME, PASSWORD, BASE_URL } = process.env;

const login = {
	lgnbtn: 'div.nav-line-1-container',
	email: 'input#ap_email',
	cntbtn: 'input#continue',
	pass: 'input#ap_password',
	signIn: 'input#signInSubmit'
};

class Loginpage {
	constructor(page) {
		this.page = page;
	}

	async clkLoginBtn() {
		await this.page.goto(BASE_URL);
		await this.page.click(login.lgnbtn);
		await this.page.waitForSelector(login.email, { Timeout: 2000 });
		await this.page.type(login.email, USER_NAME);
		await this.page.click(login.cntbtn);
		await this.page.waitForSelector(login.pass);
		await this.page.type(login.pass, PASSWORD);
		await this.page.click(login.signIn);
		await this.page.waitForSelector(login.lgnbtn);
	}
}

module.exports = Loginpage;
