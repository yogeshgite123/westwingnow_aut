import Page from '../../../lib/page';

/**
 * product list page containing its selectors and operating methods
 * This page members would be useful before and after login
 */
class ProductListPage extends Page {
    get product_list () { return $$('div[data-testid="plp-products-grid"] > div')}
    
     async getProductList () {
        try {
            await (await this.product_list)[0].waitForDisplayed(this.waitObj)
            return (await this.product_list).length
        } catch (error) {
            console.log('----Looks like we found error on fetching product list' + error)
        }
        return 0
    }

    async addFirtProductInWishList () {
        let wishListIcon = await (await this.product_list)[0].$('svg.ww-uikit_StyledHeartIcon-sc-1jh2r08')
        let selectedProductName = await (await this.product_list)[0].$('h2[data-testid="product-title"]')
        global.wishProductName = await selectedProductName.getText()
        console.log(`----Product ${global.wishProductName}  has been added to wish list`)
        await (await wishListIcon).click()
    }
}

export default new ProductListPage();
