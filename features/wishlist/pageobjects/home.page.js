import Page from '../../../lib/page';
/**
 * Home page containing selectors and methods for a page interaction
 */
class HomePage extends Page {

    get westwingnow_logo () { return $('svg.kfsNAz[aria-labelledby="title"]') }
    get product_search_input () { return $('input[data-testid="search-input"]')} 
    get firstSuggestion_link () {return $('div[data-testid="suggestions"]>div:nth-child(1) span')}
    get product_search_button () { return $('svg[data-testid="header-search-icon"]')}
    get product_title () { return $('header > div h1.RegularTitle__StyledPageTitle-zjo017-0')}
    get cookie_accept_button () { return $('#onetrust-accept-btn-handler')}
        
    async pageHasBeenLoaded () {
        try {
            await (await this.cookie_accept_button).waitForExist(this.waitObj)
            await (await this.cookie_accept_button).click()
        } catch (error) {
            console.log('----Looks like cookies popup not present, we can continue' + error)
        }

        await (await this.westwingnow_logo).waitForExist(this.waitObj)
        let isDisplayed = await (await this.westwingnow_logo).isDisplayed()
        return isDisplayed
    }

    async searchProduct (productName) {
        await (await this.product_search_input).waitForClickable(this.waitObj)
        await this.enterText(this.product_search_input, productName)
        await (await this.firstSuggestion_link).waitForExist(this.waitObj)
        await (await this.firstSuggestion_link).click()
        await (await this.product_title).waitForExist(this.waitObj)
        return this.waitUntilTextPresentInElement(await this.product_title, productName)
    }

    open (app_url) {
        return super.open(app_url);
    }
}

export default new HomePage();
