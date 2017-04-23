const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');
const util = require('./util');

export default function compress(name, data, done) {
    const srcFolder = util.buildTempFolderName(name);
    const destinyZip = path.resolve(`${name}.zip`);
    const output = fs.createWriteStream(destinyZip);
    const archive = archiver('zip');

    output.on('close', () => {
        process.stdout.write(`${archive.pointer()} total bytes archived`);
        done();
    });

    archive.on('error', (err) => {
        throw err;
    });

    archive.pipe(output);
    archive.directory(path.resolve(srcFolder), '');
    archive.finalize();
}

