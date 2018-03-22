const assert = require('assert');

describe('Проверка title на главной странице', () => {
    it('Title должен быть - Module and integration tests', function () {
        let expectedTitle = 'Module and integration tests';

        return this.browser
            .url('localhost:3000')
            .getTitle()
            .then((title) => {
                assert.ok(title === expectedTitle, 'Title не соответствует ожидаемому значению.');
            });
    });
});