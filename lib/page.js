/**
* common page methods and object which could be shared across all pages
*/
export default class Page {
    waitObj = {timeout:10000, interval:200};

    open (app_url) {
        browser.url(app_url)
        browser.maximizeWindow();
    }

    async enterText(element, text) {
        await (await element).clearValue()
        await (await element).setValue(text)        
    }

    async waitUntilTextPresentInElement(element, text) {
        try {
            await (await element).waitUntil(function () {
                return this.getText() == text
            }, {
                timeout: 5000,
                timeoutMsg: 'expected text to be different after 5s',
                interval: 500
            });
                
        } catch (error) {
            console.log('----Maybe we caught timeout')            
        }
        return (await element).getText()
    }
}