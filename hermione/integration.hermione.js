const assert = require('assert');
const config = require('../config');
const URL = config.get('host') + ':' + config.get('port');

describe('1. Отображение ветки по умолчанию.', () => {
    it('Из списка всех веток отображается ветка по умолчанию.', function () {
        return this.browser
            .url(URL)
            .assertExists('ul.branches-list a.current', 'Не отображается ветка по умолчанию.');
    });

    it('Для ветки отображается список коммитов.', function () {
        return this.browser
            .assertExists('ul.branch-commit-history', 'Для ветки не отображается список коммитов.');
    });

    it('Для ветки отображается корректный список файлов и папок.', function () {
        return this.browser
            .assertExists('ul.files-tree', 'Для ветки не отображается корректный список файлов и папок.');
    });
});

describe('2. Работа с деревом файлов в ветке по умолчанию.', () => {
    it('Перейти в один из каталогов и проверить, что отображается корректный список файлов и папок.', function () {
        return this.browser
            .url(URL)
            .click('ul.files-tree a.dir')
            .getCustomText('ul.files-tree a.file', 'style.css', 'Отображается некорректный список файлов и папок после перехода в каталог.');
    });

    it('Вернуться на каталог выше и проверить, что отображается корректный список файлов и папок.', function () {
        return this.browser
            .click('ul.files-tree a.back')
            .assertExists('ul.files-tree', 'Отображается некорректный список файлов и папок после перехода на каталог выше.');
    });
});

describe('3. Отображение содержимого файла в ветке по умолчанию.', () => {
    it('Открыть файл. Проверить, что содержимое файла отображается', function () {
        return this.browser
            .url(URL)
            .click('ul.files-tree a.dir')
            .click('ul.files-tree a.file')
            .getCustomText('.file-content', '* { margin: 0; }', 'Содержимое файла не отображается.');
    });

    it('Закрыть файл. Проверить, что отображается корректный список файлов и папок.', function () {
        return this.browser
            .click('a.close-file')
            .assertExists('ul.files-tree', 'Отображается некорректный список файлов и папок после закрытия файла.');
    });
});

describe('4. Работа с деревом файлов для коммита из ветки по умолчанию.', () => {
    it('Перейти в коммит. Проверить, что отображается корректный список файлов и папок.', function () {
        return this.browser
            .url(URL)
            .click('ul.branch-commit-history li.commit-el a')
            .countElements('.tree-line a', 4, 'Отображается некорректный список файлов.');
    });

    it('Перейти в один из каталогов. Проверить, что отображается корректный список файлов и папок', function () {
        return this.browser
            .click('ul.files-tree a.dir')
            .getCustomText('.tree-line a', 'style.css', 'Отображается некорректный список файлов.');
    });

    it('Вернуться на каталог выше. Проверить, что отображается корректный список файлов и папок.', function () {
        return this.browser
            .click('a.back')
            .countElements('.tree-line a', 4, 'Отображается некорректный список файлов.');
    });
});

describe('5. Отображение содержимого файла для коммита из ветки по умолчанию.', () => {
    it('Перейти в коммит. Перейти в каталог с файлами. Открыть файл. Проверить, что содержимое файла отображается.', function () {
        return this.browser
            .url(URL)
            .click('ul.branch-commit-history li.commit-el a')
            .click('.tree-line a.dir')
            .click('ul.files-tree a.file')
            .getCustomText('.file-content', '* { margin: 0; }', 'Содержимое файла не отображается.');
    });

    it('Закрыть файл. Проверить, что отображается корректный список файлов и папок.', function () {
        return this.browser
            .click('a.close-file')
            .getCustomText('.tree-line a', 'style.css', 'Отображается некорректный список файлов.');
    });

});

describe('6. Отображение ветки отличной от ветки по умолчанию.', () => {
    it('Выбрать ветку отличную от ветки по умолчанию.', function () {
        return this.browser
            .url(URL)
            .click('ul.branches-list li a.other')
            .then(() => {
                assert.ok(true);
            });
    });

    it('Для ветки отображается список коммитов.', function () {
        return this.browser
            .assertExists('ul.branch-commit-history', 'Для ветки не отображается список коммитов.');
    });

    it('Для ветки отображается корректный список файлов и папок.', function () {
        return this.browser
            .countElements('ul.files-tree li.tree-line', 3, 'Отображается некорректный список файлов.')
            .click('ul.branches-list li a.other');
    });
});

describe('7. Работа с деревом файлов в ветке отличной от ветки по умолчанию.', () => {
    it('Перейти в один из каталогов. Проверить, что отображается корректный список файлов и папок.', function () {
        return this.browser
            .url(URL)
            .click('ul.branches-list li a.other')
            .click('ul.files-tree a.dir')
            .getCustomText('.tree-line a.file', 'js1.js', 'Отображается некорректный список файлов.');
    });

    it('Вернуться на каталог выше. Проверить, что отображается корректный список файлов и папок.', function () {
        return this.browser
            .click('a.back')
            .countElements('.tree-line a', 3, 'Отображается некорректный список файлов.')
            .click('ul.branches-list li a.other');
    });
});


describe('8. Отображение содержимого файла в ветке отличной от ветки по умолчанию.', () => {
    it('Перейти в один из каталогов. Проверить, что отображается корректный список файлов и папок.', function () {
        return this.browser
            .url(URL)
            .click('ul.branches-list li a.other')
            .click('ul.files-tree li a.dir')
            .click('.tree-line a.file')
            .getCustomText('.file-content', 'let a = 1;', 'Содержимое файла не отображается.');
    });

    it('Вернуться на каталог выше. Проверить, что отображается корректный список файлов и папок.', function () {
        return this.browser
            .click('a.close-file')
            .countElements('.tree-line a', 2, 'Отображается некорректный список файлов.')
            .click('a.home')
            .click('ul.branches-list li a.other');
    });
});

describe('9. Работа с деревом файлов для коммита из ветки отличной от ветки по умолчанию.', () => {
    it('Перейти в коммит из ветки. Проверить, что отображается корректный список файлов и папок', function () {
        return this.browser
            .url(URL)
            .click('ul.branches-list li a.other')
            .click('ul.branch-commit-history li.commit-el a')
            .countElements('.tree-line a', 3, 'Отображается некорректный список файлов.');
    });

    it('Перейти в каталог. Проверить, что отображается корректный список файлов и папок.', function () {
        return this.browser
            .click('a.dir')
            .countElements('.tree-line a', 2, 'Отображается некорректный список файлов.');
    });

    it('Перейти на каталог выше. Проверить, что отображается корректный список файлов и папок.', function () {
        return this.browser
            .click('a.back')
            .countElements('.tree-line a', 3, 'Отображается некорректный список файлов.')
            .click('ul.branches-list li a.other');
    });
});

describe('10. Отображение содержимого файла для коммита из ветки отличной от ветки по умолчанию.', () => {
    it('Выбрать другую ветку. Перейти в коммит. Перейти в каталог с файлами. Открыть файл. Проверить, что содержимое файла отображается.', function () {
        return this.browser
            .url(URL)
            .click('ul.branches-list li a.other')
            .click('ul.branch-commit-history li.commit-el a')
            .click('ul.files-tree a.dir')
            .click('ul.files-tree a.file')
            .getCustomText('.file-content', 'let a = 1;', 'Содержимое файла не отображается.');
    });

    it('Закрыть файл. Проверить, что содержимое файла отображается.', function () {
        return this.browser
            .click('a.close-file')
            .countElements('ul.files-tree li.tree-line', 2, 'Отображается некорректный список файлов.')
            .click('a.home')
            .click('ul.branches-list li a.other');
    });
});