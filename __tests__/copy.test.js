import path from 'path';
import fs from 'fs-extra';
import util from '../src/util';
import copy from '../src/copy';

const dummyFolderName = 'temp-folder';

function createDummyFolder() {
    fs.ensureDirSync(path.resolve(dummyFolderName));
    fs.ensureDirSync(path.resolve(util.buildTempFolderName(dummyFolderName)));
}

function destroy() {
    fs.removeSync(path.resolve(util.buildTempFolderName(dummyFolderName)));
    fs.removeSync(path.resolve(dummyFolderName));
}

describe('copy module', () => {
    beforeAll(createDummyFolder);
    afterAll(destroy);

    it('should copy the provided directory to a temporary one', (done) => {
        const newFolderName = 'newFolderName';
        const buildTempFolderNameSpy = jest.spyOn(util, 'buildTempFolderName');
        const stdOutSpy = jest.spyOn(process.stdout, 'write');

        const callbackSpy = jest.fn(() => {
            expect(callbackSpy).toHaveBeenCalled();
            expect(stdOutSpy).toHaveBeenCalled();
            fs.removeSync('tmp-newFolderName');
            done();
        });

        copy(dummyFolderName, newFolderName, undefined, callbackSpy);
        expect(buildTempFolderNameSpy).toHaveBeenCalledWith(newFolderName);
    });

    it('should throw an error if source folder is current working directory', () => {
        const callbackSpy = jest.fn(() => {
            expect(callbackSpy).toHaveBeenCalled();
        });

        expect(() => copy('', 'name', undefined, callbackSpy)).toThrow(new Error('Invalid path: must not be current working directory!'));
    });

    it('should run error cb if error occurs', (done) => {
        const tempFolder = util.buildTempFolderName('name');

        const callbackSpy = jest.fn((err) => {
            expect(fs.existsSync(path.resolve(tempFolder))).toBeFalsy();
            expect(err).toBeDefined();
            expect(callbackSpy).toHaveBeenCalled();
            done();
        });

        copy('bad-name', 'name', undefined, callbackSpy);
    });
});
