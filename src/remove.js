const fs = require('fs-extra');
const path = require('path');
const util = require('./util');

const foldersToRemove = ['bower_components', 'node_modules'];

function previousBuild(fileName) {
    const zipFile = path.resolve(`${fileName}.zip`);

    if (fs.existsSync(zipFile)) {
        fs.unlink(zipFile, (err) => {
            if (err) {
                throw err;
            }

            process.stdout.write(`\nRemoved ${fileName}.zip\n`);
        });
    } else {
        process.stdout.write(`\nNo ${fileName}.zip file found. Skipping...\n`);
    }
}

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
