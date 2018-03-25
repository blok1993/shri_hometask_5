const assert = require('assert');
let gitSpawn = require('../modules/gitSpawn');

describe('Команды git должны выполняться корректно', () => {
    it('Должен происходить корректный checkout', () => {
        gitSpawn(['checkout', 'feature'], 'test-repo').then(() => {
            assert.ok(false, "checkout выполнился с ошибкой.");
        }, () => {
            assert.ok(true);
        });
    });
});