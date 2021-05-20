import { Given, When, Then } from '@cucumber/cucumber';
import homePage from './../pageobjects/home.page';
import productListPage from './../pageobjects/productlist.page';
import loginPage from './../pageobjects/login.page';
import config from '../../../lib/config';
import userhomePage from './../pageobjects/userhome.page';
import wishlistPage from './../pageobjects/wishlist.page'

/**
 * We can pass additional parameter environment e.g. qa or snd.
 * Configuration will be used as per environemnt
 */
const testEnv = process.env.TEST_ENV != null ? process.env.TEST_ENV : 'prod'; 

Given(/^I am on the WestwingNow home page$/, async () => {
    homePage.open(config[testEnv].baseUrl)
    let pageReady = await homePage.pageHasBeenLoaded()
    expect(pageReady).toStrictEqual(true)
    console.log('----I am on home page')
});

When(/^I search for "(.*)"$/, async (productName) => {
    let title = await homePage.searchProduct(productName)
    expect(title.toLowerCase()).toMatch(productName.toLowerCase())
    console.log(`----I am have searched product ${productName}`)
});

Then(/^I should see product listing page with a list of products$/, async () => {
    await loginPage.closeLoginRegisterOverLay()
    let numberOfProducts = await productListPage.getProductList()
    expect(numberOfProducts > 0).toStrictEqual(true)
    console.log(`----I am have verified ${numberOfProducts} of products on first page list`)
});

When(/^I click on wishlist icon of the first found product$/, async () => {
    await productListPage.addFirtProductInWishList()
    console.log('----I have added first product on wishlist')
});

Then(/^I should see the login\/registration overlay$/, async () => {
    let header = await loginPage.getLoginOrRegisterPopupHeader()
    expect(header.toLowerCase()).toMatch('Neukunde?'.toLowerCase())
    console.log('----I have verified login / register form visible')
})

When(/^I switch to login form of the overlay$/, async () => {
    let header = await loginPage.switchTologinOverlay()
    expect(header.toLowerCase()).toMatch('Bereits registriert?'.toLowerCase())
    console.log('----I have switched to login form')
})

When(/^I log in with "test_configuration"$/, async () => {
    await loginPage.login(config[testEnv].username, config[testEnv].password)
    await userhomePage.waitForLoginComplete(config[testEnv].firstname)
    expect(userhomePage.user_firstname_text).toHaveTextContaining(config[testEnv].firstname)
    console.log(`----I have verified login successful for user ${config[testEnv].firstname}`)
})

Then(/^the product should be added to the wishlist$/, async () => {
    expect(await userhomePage.productname_text).toHaveTextContaining(global.wishProductName)
    expect(await userhomePage.getFirstProductfillProperty()).toHaveAttributeContaining("true")
    expect(await userhomePage.wishListCounter_text).toHaveTextContaining("1")
    console.log(`----I have verified product ${global.wishProductName} added to wishlist`)
})

Then(/^I go to the wishlist page$/, async () => {
    await userhomePage.navigateToWishList()
    expect(await wishlistPage.wishListHeader_text).toHaveTextContaining("Wunschliste")
    console.log('----I have sucessfully navigated to wishlist page')
})

Then(/^I delete the product from my wishlist$/, async () => {
    await wishlistPage.deleteWishListProduct()
    expect(await wishlistPage.getNoProductText()).toHaveTextContaining('Die Wunschliste ist momentan leer')
    console.log('----I have deleted product from wishlist and verified wishlist is empty')
})