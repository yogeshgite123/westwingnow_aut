import Page from '../../../lib/page';

/**
 * Login page containing its selectors and operating methods
 */
class LoginPage extends Page {

    get username_input () { return $('input[data-testid="long-register-email-field"]') }
    get password_input () { return $('input[data-testid="long-register-password-field"]') }
    get submit_button () { return $('button[data-testid="login_reg_submit_btn"]') }
    get loginOnRegn_button () { return $('button[data-testid="login-button"]')}
    get closeLoginRegOverlay_button () { return $('button[data-identifier="LOGIN_AND_REGISTER"]')}
    get switchToLogin_button () { return $('button[data-testid="login_reg_switch_btn"]')}
    get loginTitle_text () { return $('div[data-testid="login_and_register"] p.StyledTitle___default-sc-1x0c4zz-0')}

    async login (username, password) {
        await (await this.username_input).waitForDisplayed(this.waitObj)
        await this.enterText(this.username_input, username)
        
        await (await this.password_input).waitForDisplayed(this.waitObj)
        await this.enterText(this.password_input, password)

        await (await this.submit_button).waitForDisplayed(this.waitObj)
        return (await this.submit_button).click();
    }

    open () {
        return super.open('login');
    }

    async getLoginOrRegisterPopupHeader () {
        await (await this.loginTitle_text).waitForDisplayed(this.waitObj)
        return (await this.loginTitle_text).getText()
    }

    async clickAndswitchToRegisterOrLoginPage () {
        await (await this.switchToLogin_button).waitForDisplayed(this.waitObj)
        expect(await this.switchToLogin_button).toHaveTextContaining('Hier einloggen')
        return (await this.switchToLogin_button).click()
    }

    async closeLoginRegisterOverLay() {
        try {
            await (await this.loginOnRegn_button).waitForDisplayed(this.waitObj)
            await (await this.loginOnRegn_button).click()
            await (await this.closeLoginRegOverlay_button).waitForDisplayed(this.waitObj)
            await (await this.closeLoginRegOverlay_button).click()
        } catch (error) {
            console.log('----I cannot find or handle overlay popup, lets continue' + error)
        }
    }

    async switchTologinOverlay() {
        await (await this.switchToLogin_button).waitForDisplayed(this.waitObj)
        await (await this.switchToLogin_button).click()
        return (await this.loginTitle_text).getText()
    }
}

export default new LoginPage();
