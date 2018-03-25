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

    it('Содержимое файла должно выводиться без ошибок', () => {
        gitSpawn(['cat-file', 'blob', 'd800886d9c86731ae5c4a62b0b77c437015e00d2'], 'test-repo').then((resp) => {
            assert.ok(resp === '123');
        }, () => {
            assert.ok(false, "При чтении файла произошла ошибка.");
        });
    });
});