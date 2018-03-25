const assert = require('assert');

module.exports = (hermione, opts) => {
    hermione.on(hermione.events.NEW_BROWSER, (browser) => {
        browser.addCommand('assertExists', (selector, msg) => {
            return browser
                .isExisting(selector)
                .then((exists) => assert.ok(exists, msg));
        });

        browser.addCommand('countElements', (selector, count, msg) => {
            return browser
                .elements(selector)
                .then((elements) => {
                    assert.ok(elements.value.length === count, msg);
                });
        });

        browser.addCommand('getCustomText', (selector, customText, msg) => {
            return browser
                .getText(selector)
                .then((text) => {
                    assert.ok(text === customText, msg);
                });
        });
    });
};