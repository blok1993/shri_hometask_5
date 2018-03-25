const { expect } = require('chai');

let gitSpawn = require('../modules/gitSpawn');

describe('Команды git должны выполняться корректно', () => {
    it('Содержимое файла должно выводиться без ошибок.', async () => {
        const result = await gitSpawn(['cat-file', 'blob', 'd800886d9c86731ae5c4a62b0b77c437015e00d2']);
        expect(result).equal('123');
    });

    it('Дерево файлов и директроий должно быть корректным.', async () => {
        const result = await gitSpawn(['ls-tree', '-r', '72d193a65b6bfe7eea88453343b1c9c72c29228e', './']);
        expect(result.split('\n')[0]).equal('100644 blob 639f958ef57a5e0f4aca622f068e734354e2dd2e\tREADME.md');
    });

    it('Список коммитов должен быть корректным.', async () => {
        const result = await gitSpawn(['log', '--pretty=format:%H']);
        expect(result.replace(/,/g, "").split('\n').join(' ')).equal('2cbf5f14e3a46bd9a70e224a22560f27fe6f967d c301d46c338fa3405658783db604442c606aa4bb c38c707950ad3fb19aa7eec2c35ee61a47cb4d52 d2a32b6336697e6040817985740436feb6ac9674 72d193a65b6bfe7eea88453343b1c9c72c29228e');
    });

    it('Список веток должен быть корректным.', async () => {
        const result = await gitSpawn(['branch']);
        expect(result.split('\n')).to.deep.equal([ '* feature', '  master', '' ]);
    });
});