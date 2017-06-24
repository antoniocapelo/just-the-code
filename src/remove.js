const fs = require('fs-extra');
const path = require('path');
const util = require('./util');

const foldersToRemove = ['bower_components', 'node_modules'];

/**
 * Removes the previous compressed file.
 *
 * @param {String} fileName - existing file name.
 *
 */
function previousBuild(fileName) {
    const zipFile = path.resolve(`${fileName}.zip`);

    console.log('zipfile', zipFile);
    if (fs.existsSync(zipFile)) {
        fs.removeSync(zipFile);
        process.stdout.write(`\nRemoved ${fileName}.zip\n`);
    } else {
        process.stdout.write(`\nNo ${fileName}.zip file found. Skipping...\n`);
    }
}

/**
 * Removes unnecessary files (bower/node) from temporary folder.
 *
 * @param {String} name - target name.
 * @param {Boolean} gitFlag - wether to remove git-related files.
 * @param {Object} [data] - Planify passed data.
 * @param {Function} done - Planify 'done' callback.
 *
 */
function unnecessary(name, gitFlag, data, done) {
    if (gitFlag) {
        foldersToRemove.push('.git');
        foldersToRemove.push('.gitignore');
    }

    foldersToRemove.forEach((folder) => {
        const archiveFolder = path.resolve(util.buildTempFolderName(name));
        const folderToRemove = path.resolve(archiveFolder, folder);

        fs.removeSync(folderToRemove);
    });

    process.stdout.write('\nSuccess!\n');
    done();
}

/**
 * Removes temporary folder.
 *
 * @param {String} name - temporary folder name.
 * @param {Object} [data] - Planify passed data.
 * @param {Function} done - Planify 'done' callback.
 *
 */
function temporary(name, data, done) {
    const tmpFolder = path.resolve(util.buildTempFolderName(name));

    fs.removeSync(tmpFolder);

    done();
}


module.exports = {
    previousBuild,
    unnecessary,
    temporary,
};
