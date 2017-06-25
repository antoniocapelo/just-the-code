import path from 'path';
import fs from 'fs-extra';
import util from '../src/util';
import compress from '../src/compress';

const dummyFolderName = 'temp-folder';

function createDummyFolder() {
    fs.ensureDirSync(path.resolve(dummyFolderName));
    fs.ensureDirSync(path.resolve(util.buildTempFolderName(dummyFolderName)));
}

function destroy() {
    fs.removeSync(path.resolve(dummyFolderName));
    fs.removeSync(path.resolve(`tmp-${dummyFolderName}`));
}

describe('compress module', () => {
    beforeAll(createDummyFolder);
    afterAll(destroy);

    it('should prepare the archive and write streams', (done) => {
        const buildTempFolderNameSpy = jest.spyOn(util, 'buildTempFolderName');
        const stdOutSpy = jest.spyOn(process.stdout, 'write');

        const callbackSpy = jest.fn(() => {
            expect(callbackSpy).toHaveBeenCalled();
            expect(stdOutSpy).toHaveBeenCalled();
            done();
        });

        compress(dummyFolderName, undefined, callbackSpy);
        expect(buildTempFolderNameSpy).toHaveBeenCalledWith(dummyFolderName);
        expect(fs.existsSync(path.resolve(`${dummyFolderName}.zip`))).toBeTruthy();
    });

    it('should throw an error if source folder is not found', () => {
        const buildTempFolderNameSpy = jest.spyOn(util, 'buildTempFolderName');

        const callbackSpy = jest.fn((err) => {
            expect(fs.existsSync(path.resolve('unknown.zip'))).toBeFalsy();
            expect(err).toBeDefined();
            expect(callbackSpy).toHaveBeenCalled();
        });

        expect(() => compress('unknown', undefined, callbackSpy)).toThrow();
        expect(buildTempFolderNameSpy).toHaveBeenCalledWith('unknown');
        fs.removeSync(path.resolve('unknown.zip'));
    });

    it('should run error cb if error occurs', () => {
        const callbackSpy = jest.fn((err) => {
            expect(fs.existsSync(path.resolve('unknown.zip'))).toBeFalsy();
            expect(err).toBeDefined();
            expect(callbackSpy).toHaveBeenCalled();
        });

        const archive = compress(dummyFolderName, undefined, callbackSpy);

        archive.append('anotherString', { name: 'file2' });
    });
});
