import Page from '../../../lib/page';
import productListPage from './productlist.page'

/**
 * User home page containing selectors and operating methods.
 * Its a page appear after login
 */
class UserHomePage extends Page {
    
     get user_firstname_text () { return $('div[data-testid="one-header-icon-my-account"]')}
     get productname_text () { return $('div[data-testid="plp-products-grid"] > div:nth-child(1) h2[data-testid="product-title"]')}
     get wishListCounter_text () { return $('span[data-testid="wishlist-counter"]')}

     async waitForLoginComplete (firstname) {
         return this.waitUntilTextPresentInElement(await this.user_firstname_text, firstname)
     }

     async getFirstProductfillProperty () {
        let wishListIcon = await (await productListPage.product_list)[0].$('svg.ww-uikit_StyledHeartIcon-sc-1jh2r08')
        return wishListIcon.getAttribute('data-is-selected')
     }

     async navigateToWishList () {
        return (await this.wishListCounter_text).click()         
     }
}

export default new UserHomePage();