import Page from '../../../lib/page';

/**
 * Wishlist page containing selectors and its operating methods
 */
class WishListPage extends Page {
    get wishListHeader_text () { return $('div.wishlistContainers a.moodBoard__switchHeaderButton--wishlist')}
    get deleteProduct_button () { return $('button.blockListProduct__delete')}
    get noProduct_text () { return $('div.wishlistNoProducts__info')}

    async deleteWishListProduct () {
        await (await this.deleteProduct_button).waitForDisplayed(this.waitObj)
        return (await this.deleteProduct_button).click()         
     }

    async getNoProductText () {
        await (await this.noProduct_text).waitForDisplayed(this.waitObj)
        return (await this.noProduct_text).getText()
    }
}

export default new WishListPage();