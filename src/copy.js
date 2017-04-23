const util = require('./util');
const path = require('path');
const fs = require('fs-extra');

/**
 * Copies source folder into temporary.
 *
 * @param {String} src - source folder.
 * @param {String} name - target file name.
 * @param {Object} [data] - Planify passed data.
 * @param {Function} done - Planify 'done' callback.
 *
 */
export default function copyFolder(src, name, data, done) {
    const srcPath = path.resolve(src);
    const destination = util.buildTempFolderName(name);

    if (srcPath === process.cwd()) {
        throw new Error('Invalid path: must not be current working directory!');
    }

    fs.copy(srcPath, destination, (err) => {
        if (err) {
            throw new Error(err);
        }

        process.stdout.write('\nSuccess!\n');
        done();
    });
}
