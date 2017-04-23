const util = require('./util');
const path = require('path');
const fs = require('fs-extra');

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
