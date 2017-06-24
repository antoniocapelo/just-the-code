const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');
const util = require('./util');

/**
 * Compresses the temporary folder into a [name].zip file.
 *
 * @param {String} name - desired compressed file name.
 * @param {Object} [data] - Planify passed data.
 * @param {Function} done - Planify 'done' callback.
 *
 * @returns {Object} Archiver object.
 *
 */
export default function compress(name, data, done) {
    const srcFolder = util.buildTempFolderName(name);
    const destinyZip = path.resolve(`${name}.zip`);
    const output = fs.createWriteStream(destinyZip);
    const archive = archiver('zip');

    if (!fs.existsSync(path.resolve(srcFolder))) {
        throw new Error('Source folder does not exist');
    }

    output.on('close', () => {
        process.stdout.write(`${archive.pointer()} total bytes archived`);
        done();
    });

    archive.on('error', (err) => {
        process.stdout.write(`An error occurred: ${err}`);
        fs.removeSync(path.resolve(destinyZip));
        done(new Error(`Archiver error: ${err}`));
    });

    archive.pipe(output);
    archive.directory(path.resolve(srcFolder), '');
    archive.finalize();
    return archive;
}

