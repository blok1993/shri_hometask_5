const { expect } = require('chai');

let gitSpawn = require('../modules/gitSpawn');

describe('Команды git должны выполняться корректно', () => {
    it('Содержимое файла должно выводиться без ошибок', async () => {
        const answer = await gitSpawn(['cat-file', 'blob', 'd800886d9c86731ae5c4a62b0b77c437015e00d2'], 'test-repo');
        expect(answer).equal('123');
    });
});