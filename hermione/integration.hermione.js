const assert = require('assert');

describe('Отображение ветки по умолчанию', () => {

    it('Из списка всех веток отображается ветка по умолчанию', function () {
        return this.browser
            .url('localhost:3000')
            .isExisting('ul.branches-list a.current')
            .then((exists) => {
                assert.ok(exists, 'Не отображается ветка по умолчанию.');
            });
    });

    it('Для ветки отображается список коммитов', function () {
        return this.browser
            .isExisting('ul.branch-commit-history')
            .then((exists) => {
                assert.ok(exists, 'Для ветки не отображается список коммитов.');
            });
    });

    it('Для ветки отображается корректный список файлов и папок', function () {
        return this.browser
            .isExisting('ul.files-tree')
            .then((exists) => {
                assert.ok(exists, 'Для ветки не отображается корректный список файлов и папок.');
            });
    });
});

describe('Работа с деревом файлов в ветке по умолчанию', () => {

    it('Перейти в один из каталогов и проверить, что отображается корректный список файлов и папок', function () {
        return this.browser
            .url('localhost:3000')
            .click('ul.files-tree a.dir')
            .isExisting('ul.files-tree')
            .then((exists) => {
                assert.ok(exists, 'Отображается некорректный список файлов и папок после перехода в каталог.');
            });
    });

    it('Вернуться на каталог выше и проверить, что отображается корректный список файлов и папок', function () {
        return this.browser
            .click('ul.files-tree a.back')
            .isExisting('ul.files-tree')
            .then((exists) => {
                assert.ok(exists, 'Отображается некорректный список файлов и папок после перехода на каталог выше.');
            });
    });
});