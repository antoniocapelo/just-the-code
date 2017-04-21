#!/usr/bin/env node
'use strict';

require('babel-polyfill');

var yargs = require('yargs');
var planify = require('planify');
var fs = require('fs-extra');
var path = require('path');
var CWD = './';
var foldersToRemove = ['bower_components', 'node_modules'];
var archiver = require('archiver');

// ---------------------------------------------------------
// CLI definition
// ---------------------------------------------------------

var argv = yargs.strict().wrap(Math.min(120, yargs.terminalWidth())).help('help').alias('help', 'h').usage('Usage: ./$0 path-to-compress [options]').option('name', {
    alias: 'n',
    type: 'string',
    default: 'archive'
}).option('git', {
    alias: 'g',
    type: 'boolean',
    default: false
}).demandCommand(1, 'Please provide the directory you which to compress.').argv;

// ---------------------------------------------------------
// Functions
// ---------------------------------------------------------

function buildTempFolderName(archiveName) {
    // return `.tmp.${archiveName}/`;
    return 'tmp-' + archiveName + '/';
}

function removePreviousBuild() {
    var zipFile = path.resolve(argv.name + '.zip');

    if (fs.existsSync(zipFile)) {
        fs.unlink(zipFile, function (err) {
            if (err) {
                throw err;
            }

            process.stdout.write('\nRemoved ' + argv.name + '.zip\n');
        });
    } else {
        process.stdout.write('\nNo ' + argv.name + '.zip file found. Skipping...\n');
    }
}

function copyFolder(data, done) {
    var src = argv._[0];
    var srcPath = path.resolve(src);
    var destination = buildTempFolderName(argv.name);

    if (srcPath === path.resolve(CWD)) {
        throw new Error('Invalid path: must not be current working directory!');
    }

    fs.copy(srcPath, destination, function (err) {
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

    foldersToRemove.forEach(function (folder) {
        var archiveFolder = path.resolve(buildTempFolderName(argv.name));
        var folderToRemove = path.resolve(archiveFolder, folder);

        fs.removeSync(folderToRemove);
    });

    process.stdout.write('\nSuccess!\n');
    done();
}

function compress(data, done) {
    var srcFolder = buildTempFolderName(argv.name);
    var destinyZip = path.resolve(argv.name + '.zip');
    var output = fs.createWriteStream(destinyZip);
    var archive = archiver('zip');

    output.on('close', function () {
        process.stdout.write(archive.pointer() + ' total bytes archived');
        done();
    });

    archive.on('error', function (err) {
        throw err;
    });

    archive.pipe(output);
    archive.directory(path.resolve(srcFolder), '');
    archive.finalize();
}

function removeTemp(data, done) {
    var tmpFolder = path.resolve(buildTempFolderName(argv.name));

    fs.removeSync(tmpFolder);
    done();
}

// ---------------------------------------------------------
// Steps
// ---------------------------------------------------------

planify({ exit: true, reporter: argv.reporter }).step('Cleaning previous zip file', removePreviousBuild).step('Copying folder to temp folder', copyFolder).step('Removing dependency folders', removeUnnecessary).step('Compressing copied folder', compress)
// .step('Removing the temporary folder', removeTemp)
.run();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwieWFyZ3MiLCJwbGFuaWZ5IiwiZnMiLCJwYXRoIiwiQ1dEIiwiZm9sZGVyc1RvUmVtb3ZlIiwiYXJjaGl2ZXIiLCJhcmd2Iiwic3RyaWN0Iiwid3JhcCIsIk1hdGgiLCJtaW4iLCJ0ZXJtaW5hbFdpZHRoIiwiaGVscCIsImFsaWFzIiwidXNhZ2UiLCJvcHRpb24iLCJ0eXBlIiwiZGVmYXVsdCIsImRlbWFuZENvbW1hbmQiLCJidWlsZFRlbXBGb2xkZXJOYW1lIiwiYXJjaGl2ZU5hbWUiLCJyZW1vdmVQcmV2aW91c0J1aWxkIiwiemlwRmlsZSIsInJlc29sdmUiLCJuYW1lIiwiZXhpc3RzU3luYyIsInVubGluayIsImVyciIsInByb2Nlc3MiLCJzdGRvdXQiLCJ3cml0ZSIsImNvcHlGb2xkZXIiLCJkYXRhIiwiZG9uZSIsInNyYyIsIl8iLCJzcmNQYXRoIiwiZGVzdGluYXRpb24iLCJFcnJvciIsImNvcHkiLCJyZW1vdmVVbm5lY2Vzc2FyeSIsImdpdCIsInB1c2giLCJmb3JFYWNoIiwiZm9sZGVyIiwiYXJjaGl2ZUZvbGRlciIsImZvbGRlclRvUmVtb3ZlIiwicmVtb3ZlU3luYyIsImNvbXByZXNzIiwic3JjRm9sZGVyIiwiZGVzdGlueVppcCIsIm91dHB1dCIsImNyZWF0ZVdyaXRlU3RyZWFtIiwiYXJjaGl2ZSIsIm9uIiwicG9pbnRlciIsInBpcGUiLCJkaXJlY3RvcnkiLCJmaW5hbGl6ZSIsInJlbW92ZVRlbXAiLCJ0bXBGb2xkZXIiLCJleGl0IiwicmVwb3J0ZXIiLCJzdGVwIiwicnVuIl0sIm1hcHBpbmdzIjoiOztBQUVBQSxRQUFRLGdCQUFSOztBQUVBLElBQU1DLFFBQVFELFFBQVEsT0FBUixDQUFkO0FBQ0EsSUFBTUUsVUFBVUYsUUFBUSxTQUFSLENBQWhCO0FBQ0EsSUFBTUcsS0FBS0gsUUFBUSxVQUFSLENBQVg7QUFDQSxJQUFNSSxPQUFPSixRQUFRLE1BQVIsQ0FBYjtBQUNB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LEVBR0NnQyxJQUhELENBR00sNkJBSE4sRUFHcUN2QixpQkFIckMsRUFJQ3VCLElBSkQsQ0FJTSwyQkFKTixFQUltQ2YsUUFKbkM7QUFLQTtBQUxBLENBTUNnQixHQU5EIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbnJlcXVpcmUoJ2JhYmVsLXBvbHlmaWxsJyk7XG5cbmNvbnN0IHlhcmdzID0gcmVxdWlyZSgneWFyZ3MnKTtcbmNvbnN0IHBsYW5pZnkgPSByZXF1aXJlKCdwbGFuaWZ5Jyk7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzLWV4dHJhJyk7XG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuY29uc3QgQ1dEID0gJy4vJztcbmNvbnN0IGZvbGRlcnNUb1JlbW92ZSA9IFsnYm93ZXJfY29tcG9uZW50cycsICdub2RlX21vZHVsZXMnXTtcbmNvbnN0IGFyY2hpdmVyID0gcmVxdWlyZSgnYXJjaGl2ZXInKTtcblxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIENMSSBkZWZpbml0aW9uXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuY29uc3QgYXJndiA9IHlhcmdzXG4uc3RyaWN0KClcbi53cmFwKE1hdGgubWluKDEyMCwgeWFyZ3MudGVybWluYWxXaWR0aCgpKSlcbi5oZWxwKCdoZWxwJykuYWxpYXMoJ2hlbHAnLCAnaCcpXG4udXNhZ2UoJ1VzYWdlOiAuLyQwIHBhdGgtdG8tY29tcHJlc3MgW29wdGlvbnNdJylcbi5vcHRpb24oJ25hbWUnLCB7XG4gICAgYWxpYXM6ICduJyxcbiAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICBkZWZhdWx0OiAnYXJjaGl2ZScsXG59KVxuLm9wdGlvbignZ2l0Jywge1xuICAgIGFsaWFzOiAnZycsXG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IGZhbHNlLFxufSlcbi5kZW1hbmRDb21tYW5kKDEsICdQbGVhc2UgcHJvdmlkZSB0aGUgZGlyZWN0b3J5IHlvdSB3aGljaCB0byBjb21wcmVzcy4nKVxuLmFyZ3Y7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRnVuY3Rpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gYnVpbGRUZW1wRm9sZGVyTmFtZShhcmNoaXZlTmFtZSkge1xuICAgIC8vIHJldHVybiBgLnRtcC4ke2FyY2hpdmVOYW1lfS9gO1xuICAgIHJldHVybiBgdG1wLSR7YXJjaGl2ZU5hbWV9L2A7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVByZXZpb3VzQnVpbGQoKSB7XG4gICAgY29uc3QgemlwRmlsZSA9IHBhdGgucmVzb2x2ZShgJHthcmd2Lm5hbWV9LnppcGApO1xuXG4gICAgaWYgKGZzLmV4aXN0c1N5bmMoemlwRmlsZSkpIHtcbiAgICAgICAgZnMudW5saW5rKHppcEZpbGUsIChlcnIpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGBcXG5SZW1vdmVkICR7YXJndi5uYW1lfS56aXBcXG5gKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoYFxcbk5vICR7YXJndi5uYW1lfS56aXAgZmlsZSBmb3VuZC4gU2tpcHBpbmcuLi5cXG5gKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNvcHlGb2xkZXIoZGF0YSwgZG9uZSkge1xuICAgIGNvbnN0IHNyYyA9IGFyZ3YuX1swXTtcbiAgICBjb25zdCBzcmNQYXRoID0gcGF0aC5yZXNvbHZlKHNyYyk7XG4gICAgY29uc3QgZGVzdGluYXRpb24gPSBidWlsZFRlbXBGb2xkZXJOYW1lKGFyZ3YubmFtZSk7XG5cbiAgICBpZiAoc3JjUGF0aCA9PT0gcGF0aC5yZXNvbHZlKENXRCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHBhdGg6IG11c3Qgbm90IGJlIGN1cnJlbnQgd29ya2luZyBkaXJlY3RvcnkhJyk7XG4gICAgfVxuXG4gICAgZnMuY29weShzcmNQYXRoLCBkZXN0aW5hdGlvbiwgKGVycikgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKCdcXG5TdWNjZXNzIVxcbicpO1xuICAgICAgICBkb25lKCk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVVubmVjZXNzYXJ5KGRhdGEsIGRvbmUpIHtcbiAgICBpZiAoYXJndi5naXQpIHtcbiAgICAgICAgZm9sZGVyc1RvUmVtb3ZlLnB1c2goJy5naXQnKTtcbiAgICAgICAgZm9sZGVyc1RvUmVtb3ZlLnB1c2goJy5naXRpZ25vcmUnKTtcbiAgICB9XG5cbiAgICBmb2xkZXJzVG9SZW1vdmUuZm9yRWFjaCgoZm9sZGVyKSA9PiB7XG4gICAgICAgIGNvbnN0IGFyY2hpdmVGb2xkZXIgPSBwYXRoLnJlc29sdmUoYnVpbGRUZW1wRm9sZGVyTmFtZShhcmd2Lm5hbWUpKTtcbiAgICAgICAgY29uc3QgZm9sZGVyVG9SZW1vdmUgPSBwYXRoLnJlc29sdmUoYXJjaGl2ZUZvbGRlciwgZm9sZGVyKTtcblxuICAgICAgICBmcy5yZW1vdmVTeW5jKGZvbGRlclRvUmVtb3ZlKTtcbiAgICB9KTtcblxuICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKCdcXG5TdWNjZXNzIVxcbicpO1xuICAgIGRvbmUoKTtcbn1cblxuZnVuY3Rpb24gY29tcHJlc3MoZGF0YSwgZG9uZSkge1xuICAgIGNvbnN0IHNyY0ZvbGRlciA9IGJ1aWxkVGVtcEZvbGRlck5hbWUoYXJndi5uYW1lKTtcbiAgICBjb25zdCBkZXN0aW55WmlwID0gcGF0aC5yZXNvbHZlKGAke2FyZ3YubmFtZX0uemlwYCk7XG4gICAgY29uc3Qgb3V0cHV0ID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0oZGVzdGlueVppcCk7XG4gICAgY29uc3QgYXJjaGl2ZSA9IGFyY2hpdmVyKCd6aXAnKTtcblxuICAgIG91dHB1dC5vbignY2xvc2UnLCAoKSA9PiB7XG4gICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGAke2FyY2hpdmUucG9pbnRlcigpfSB0b3RhbCBieXRlcyBhcmNoaXZlZGApO1xuICAgICAgICBkb25lKCk7XG4gICAgfSk7XG5cbiAgICBhcmNoaXZlLm9uKCdlcnJvcicsIChlcnIpID0+IHtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH0pO1xuXG4gICAgYXJjaGl2ZS5waXBlKG91dHB1dCk7XG4gICAgYXJjaGl2ZS5kaXJlY3RvcnkocGF0aC5yZXNvbHZlKHNyY0ZvbGRlciksICcnKTtcbiAgICBhcmNoaXZlLmZpbmFsaXplKCk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVRlbXAoZGF0YSwgZG9uZSkge1xuICAgIGNvbnN0IHRtcEZvbGRlciA9IHBhdGgucmVzb2x2ZShidWlsZFRlbXBGb2xkZXJOYW1lKGFyZ3YubmFtZSkpO1xuXG4gICAgZnMucmVtb3ZlU3luYyh0bXBGb2xkZXIpO1xuICAgIGRvbmUoKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBTdGVwc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnBsYW5pZnkoeyBleGl0OiB0cnVlLCByZXBvcnRlcjogYXJndi5yZXBvcnRlciB9KVxuLnN0ZXAoJ0NsZWFuaW5nIHByZXZpb3VzIHppcCBmaWxlJywgcmVtb3ZlUHJldmlvdXNCdWlsZClcbi5zdGVwKCdDb3B5aW5nIGZvbGRlciB0byB0ZW1wIGZvbGRlcicsIGNvcHlGb2xkZXIpXG4uc3RlcCgnUmVtb3ZpbmcgZGVwZW5kZW5jeSBmb2xkZXJzJywgcmVtb3ZlVW5uZWNlc3NhcnkpXG4uc3RlcCgnQ29tcHJlc3NpbmcgY29waWVkIGZvbGRlcicsIGNvbXByZXNzKVxuLy8gLnN0ZXAoJ1JlbW92aW5nIHRoZSB0ZW1wb3JhcnkgZm9sZGVyJywgcmVtb3ZlVGVtcClcbi5ydW4oKTtcblxuIl19