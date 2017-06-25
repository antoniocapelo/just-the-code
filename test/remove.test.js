import path from 'path';
import fs from 'fs-extra';
import remove from '../src/remove';
import util from '../src/util';

function destroy() {
    fs.removeSync(path.resolve('test-dummy-file.zip'));
}

describe('remove module', () => {
    beforeAll(jest.clearAllMocks);
    afterAll(destroy);

    describe('previousBuild function', () => {
        beforeAll(jest.clearAllMocks);
        it('shoud call remove the zip file if it exists', () => {
            const existsSyncSpy = jest.spyOn(fs, 'existsSync');
            const removeSpy = jest.spyOn(fs, 'removeSync');

            fs.ensureFileSync(path.resolve('test-dummy-file.zip'));
            remove.previousBuild('test-dummy-file');

            const zipFile = path.resolve('test-dummy-file.zip');

            expect(existsSyncSpy).toHaveBeenCalledWith(zipFile);
            expect(removeSpy).toHaveBeenCalledWith(zipFile);
        });

        it('shoud not call remove if the the zip file does not exist', () => {
            const existsSyncSpy = jest.spyOn(fs, 'existsSync');
            const removeSpy = jest.spyOn(fs, 'remove');

            remove.previousBuild('unexisting file');

            const zipFile = path.resolve('unexisting file.zip');

            expect(existsSyncSpy).toHaveBeenCalledWith(zipFile);
            expect(removeSpy).not.toHaveBeenCalled();
        });
    });

    describe('unnecessary function', () => {
        beforeAll(jest.clearAllMocks);

        it('shoud call remove the zip on the base unnecessary folders', () => {
            const removeSpy = jest.spyOn(fs, 'removeSync');
            const cbSpy = jest.fn();

            remove.unnecessary('target', false, undefined, cbSpy);
            const tmpTarget = util.buildTempFolderName('target');

            expect(removeSpy.mock.calls)
                .toEqual([[path.resolve(`${tmpTarget}/bower_components`)], [path.resolve(`${tmpTarget}/node_modules`)]]);
            expect(cbSpy).toHaveBeenCalled();
        });

        it('shoud call remove the zip on the base unnecessary folders and git files, if git flag is true', () => {
            const removeSpy = jest.spyOn(fs, 'removeSync');
            const tmpTarget = util.buildTempFolderName('target');
            const cbSpy = jest.fn();

            remove.unnecessary('target', true, undefined, cbSpy);

            expect(removeSpy.mock.calls)
                .toEqual(expect
                    .arrayContaining([[path.resolve(`${tmpTarget}/.git`)],
                        [path.resolve(`${tmpTarget}/.gitignore`)]]
                    )
                );
            expect(cbSpy).toHaveBeenCalled();
        });
    });

    describe('temporary function', () => {
        beforeAll(jest.clearAllMocks);

        it('shoud call remove on the result of the buildTempFolderName fn', () => {
            const removeSpy = jest.spyOn(fs, 'removeSync');
            const tmpTarget = util.buildTempFolderName('target');
            const tmpFolder = path.resolve(tmpTarget);
            const cbSpy = jest.fn();

            remove.temporary('target', undefined, cbSpy);

            expect(removeSpy).toHaveBeenCalledWith(tmpFolder);
            expect(cbSpy).toHaveBeenCalled();
        });
    });
});
