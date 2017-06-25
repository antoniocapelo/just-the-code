const util = require('../src/util');

describe('buildTempFolderName method', () => {
    it('returns the correct temporary folder name', () => {
        let expected = 'tmp-/';

        expect(util.buildTempFolderName('')).toBe(expected);

        expected = 'tmp-sample/';

        expect(util.buildTempFolderName('sample')).toBe(expected);
    });
});


