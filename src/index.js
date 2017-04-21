#!/usr/bin/env node

require('babel-polyfill');

const yargs = require('yargs');
const planify = require('planify');
const fs = require('fs-extra');
const path = require('path');
const CWD = './';
const foldersToRemove = ['bower_components', 'node_modules'];
const archiver = require('archiver');


// ---------------------------------------------------------
// CLI definition
// ---------------------------------------------------------

const argv = yargs
.strict()
.wrap(Math.min(120, yargs.terminalWidth()))
.help('help').alias('help', 'h')
.usage('Usage: ./$0 path-to-compress [options]')
.option('name', {
    alias: 'n',
    type: 'string',
    default: 'archive',
})
.option('git', {
    alias: 'g',
    type: 'boolean',
    default: false,
})
.demandCommand(1, 'Please provide the directory you which to compress.')
.argv;

// ---------------------------------------------------------
// Functions
// ---------------------------------------------------------

function buildTempFolderName(archiveName) {
    // return `.tmp.${archiveName}/`;
    return `tmp-${archiveName}/`;
}

function removePreviousBuild() {
    const zipFile = path.resolve(`${argv.name}.zip`);

    if (fs.existsSync(zipFile)) {
        fs.unlink(zipFile, (err) => {
            if (err) {
                throw err;
            }

            process.stdout.write(`\nRemoved ${argv.name}.zip\n`);
        });
    } else {
        process.stdout.write(`\nNo ${argv.name}.zip file found. Skipping...\n`);
    }
}

function copyFolder(data, done) {
    const src = argv._[0];
    const srcPath = path.resolve(src);
    const destination = buildTempFolderName(argv.name);

    if (srcPath === path.resolve(CWD)) {
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

function removeUnnecessary(data, done) {
    if (argv.git) {
        foldersToRemove.push('.git');
        foldersToRemove.push('.gitignore');
    }

    foldersToRemove.forEach((folder) => {
        const archiveFolder = path.resolve(buildTempFolderName(argv.name));
        const folderToRemove = path.resolve(archiveFolder, folder);

        fs.removeSync(folderToRemove);
    });

    process.stdout.write('\nSuccess!\n');
    done();
}

function compress(data, done) {
    const srcFolder = buildTempFolderName(argv.name);
    const destinyZip = path.resolve(`${argv.name}.zip`);
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

function removeTemp(data, done) {
    const tmpFolder = path.resolve(buildTempFolderName(argv.name));

    fs.removeSync(tmpFolder);
    done();
}

// ---------------------------------------------------------
// Steps
// ---------------------------------------------------------

planify({ exit: true, reporter: argv.reporter })
.step('Cleaning previous zip file', removePreviousBuild)
.step('Copying folder to temp folder', copyFolder)
.step('Removing dependency folders', removeUnnecessary)
.step('Compressing copied folder', compress)
// .step('Removing the temporary folder', removeTemp)
.run();

