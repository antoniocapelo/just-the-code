#!/usr/bin/env node
'use strict';

require('babel-polyfill');

var yargs = require('yargs');
var planify = require('planify');
var fs = require('fs-extra');
var path = require('path');
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

    if (srcPath === process.cwd()) {
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

planify({ exit: true, reporter: argv.reporter }).step('Cleaning previous zip file', removePreviousBuild).step('Copying folder to temp folder', copyFolder).step('Removing dependency folders', removeUnnecessary).step('Compressing copied folder', compress).step('Removing the temporary folder', removeTemp).run();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwieWFyZ3MiLCJwbGFuaWZ5IiwiZnMiLCJwYXRoIiwiZm9sZGVyc1RvUmVtb3ZlIiwiYXJjaGl2ZXIiLCJhcmd2Iiwic3RyaWN0Iiwid3JhcCIsIk1hdGgiLCJtaW4iLCJ0ZXJtaW5hbFdpZHRoIiwiaGVscCIsImFsaWFzIiwidXNhZ2UiLCJvcHRpb24iLCJ0eXBlIiwiZGVmYXVsdCIsImRlbWFuZENvbW1hbmQiLCJidWlsZFRlbXBGb2xkZXJOYW1lIiwiYXJjaGl2ZU5hbWUiLCJyZW1vdmVQcmV2aW91c0J1aWxkIiwiemlwRmlsZSIsInJlc29sdmUiLCJuYW1lIiwiZXhpc3RzU3luYyIsInVubGluayIsImVyciIsInByb2Nlc3MiLCJzdGRvdXQiLCJ3cml0ZSIsImNvcHlGb2xkZXIiLCJkYXRhIiwiZG9uZSIsInNyYyIsIl8iLCJzcmNQYXRoIiwiZGVzdGluYXRpb24iLCJjd2QiLCJFcnJvciIsImNvcHkiLCJyZW1vdmVVbm5lY2Vzc2FyeSIsImdpdCIsInB1c2giLCJmb3JFYWNoIiwiZm9sZGVyIiwiYXJjaGl2ZUZvbGRlciIsImZvbGRlclRvUmVtb3ZlIiwicmVtb3ZlU3luYyIsImNvbXByZXNzIiwic3JjRm9sZGVyIiwiZGVzdGlueVppcCIsIm91dHB1dCIsImNyZWF0ZVdyaXRlU3RyZWFtIiwiYXJjaGl2ZSIsIm9uIiwicG9pbnRlciIsInBpcGUiLCJkaXJlY3RvcnkiLCJmaW5hbGl6ZSIsInJlbW92ZVRlbXAiLCJ0bXBGb2xkZXIiLCJleGl0IiwicmVwb3J0ZXIiLCJzdGVwIiwicnVuIl0sIm1hcHBpbmdzIjoiOztBQUVBQSxRQUFRLGdCQUFSOztBQUVBLElBQU1DLFFBQVFELFFBQVEsT0FBUixDQUFkO0FBQ0EsSUFBTUUsVUFBVUYsUUFBUSxTQUFSLENBQWhCO0FBQ0EsSUFBTUcsS0FBS0gsUUFBUSxVQUFSLENBQVg7QUFDQSxJQUFNSSxPQUFPSixRQUFRLE1BQVIsQ0FBYjtBQUNB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SHJDLEVBSUN1QixJQUpELENBSU0sMkJBSk4sRUFJbUNmLFFBSm5DLEVBS0NlLElBTEQsQ0FLTSwrQkFMTixFQUt1Q0osVUFMdkMsRUFNQ0ssR0FORCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5yZXF1aXJlKCdiYWJlbC1wb2x5ZmlsbCcpO1xuXG5jb25zdCB5YXJncyA9IHJlcXVpcmUoJ3lhcmdzJyk7XG5jb25zdCBwbGFuaWZ5ID0gcmVxdWlyZSgncGxhbmlmeScpO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcy1leHRyYScpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IGZvbGRlcnNUb1JlbW92ZSA9IFsnYm93ZXJfY29tcG9uZW50cycsICdub2RlX21vZHVsZXMnXTtcbmNvbnN0IGFyY2hpdmVyID0gcmVxdWlyZSgnYXJjaGl2ZXInKTtcblxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIENMSSBkZWZpbml0aW9uXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuY29uc3QgYXJndiA9IHlhcmdzXG4uc3RyaWN0KClcbi53cmFwKE1hdGgubWluKDEyMCwgeWFyZ3MudGVybWluYWxXaWR0aCgpKSlcbi5oZWxwKCdoZWxwJykuYWxpYXMoJ2hlbHAnLCAnaCcpXG4udXNhZ2UoJ1VzYWdlOiAuLyQwIHBhdGgtdG8tY29tcHJlc3MgW29wdGlvbnNdJylcbi5vcHRpb24oJ25hbWUnLCB7XG4gICAgYWxpYXM6ICduJyxcbiAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICBkZWZhdWx0OiAnYXJjaGl2ZScsXG59KVxuLm9wdGlvbignZ2l0Jywge1xuICAgIGFsaWFzOiAnZycsXG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IGZhbHNlLFxufSlcbi5kZW1hbmRDb21tYW5kKDEsICdQbGVhc2UgcHJvdmlkZSB0aGUgZGlyZWN0b3J5IHlvdSB3aGljaCB0byBjb21wcmVzcy4nKVxuLmFyZ3Y7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRnVuY3Rpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gYnVpbGRUZW1wRm9sZGVyTmFtZShhcmNoaXZlTmFtZSkge1xuICAgIC8vIHJldHVybiBgLnRtcC4ke2FyY2hpdmVOYW1lfS9gO1xuICAgIHJldHVybiBgdG1wLSR7YXJjaGl2ZU5hbWV9L2A7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVByZXZpb3VzQnVpbGQoKSB7XG4gICAgY29uc3QgemlwRmlsZSA9IHBhdGgucmVzb2x2ZShgJHthcmd2Lm5hbWV9LnppcGApO1xuXG4gICAgaWYgKGZzLmV4aXN0c1N5bmMoemlwRmlsZSkpIHtcbiAgICAgICAgZnMudW5saW5rKHppcEZpbGUsIChlcnIpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGBcXG5SZW1vdmVkICR7YXJndi5uYW1lfS56aXBcXG5gKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoYFxcbk5vICR7YXJndi5uYW1lfS56aXAgZmlsZSBmb3VuZC4gU2tpcHBpbmcuLi5cXG5gKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNvcHlGb2xkZXIoZGF0YSwgZG9uZSkge1xuICAgIGNvbnN0IHNyYyA9IGFyZ3YuX1swXTtcbiAgICBjb25zdCBzcmNQYXRoID0gcGF0aC5yZXNvbHZlKHNyYyk7XG4gICAgY29uc3QgZGVzdGluYXRpb24gPSBidWlsZFRlbXBGb2xkZXJOYW1lKGFyZ3YubmFtZSk7XG5cbiAgICBpZiAoc3JjUGF0aCA9PT0gcHJvY2Vzcy5jd2QoKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgcGF0aDogbXVzdCBub3QgYmUgY3VycmVudCB3b3JraW5nIGRpcmVjdG9yeSEnKTtcbiAgICB9XG5cbiAgICBmcy5jb3B5KHNyY1BhdGgsIGRlc3RpbmF0aW9uLCAoZXJyKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoJ1xcblN1Y2Nlc3MhXFxuJyk7XG4gICAgICAgIGRvbmUoKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlVW5uZWNlc3NhcnkoZGF0YSwgZG9uZSkge1xuICAgIGlmIChhcmd2LmdpdCkge1xuICAgICAgICBmb2xkZXJzVG9SZW1vdmUucHVzaCgnLmdpdCcpO1xuICAgICAgICBmb2xkZXJzVG9SZW1vdmUucHVzaCgnLmdpdGlnbm9yZScpO1xuICAgIH1cblxuICAgIGZvbGRlcnNUb1JlbW92ZS5mb3JFYWNoKChmb2xkZXIpID0+IHtcbiAgICAgICAgY29uc3QgYXJjaGl2ZUZvbGRlciA9IHBhdGgucmVzb2x2ZShidWlsZFRlbXBGb2xkZXJOYW1lKGFyZ3YubmFtZSkpO1xuICAgICAgICBjb25zdCBmb2xkZXJUb1JlbW92ZSA9IHBhdGgucmVzb2x2ZShhcmNoaXZlRm9sZGVyLCBmb2xkZXIpO1xuXG4gICAgICAgIGZzLnJlbW92ZVN5bmMoZm9sZGVyVG9SZW1vdmUpO1xuICAgIH0pO1xuXG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoJ1xcblN1Y2Nlc3MhXFxuJyk7XG4gICAgZG9uZSgpO1xufVxuXG5mdW5jdGlvbiBjb21wcmVzcyhkYXRhLCBkb25lKSB7XG4gICAgY29uc3Qgc3JjRm9sZGVyID0gYnVpbGRUZW1wRm9sZGVyTmFtZShhcmd2Lm5hbWUpO1xuICAgIGNvbnN0IGRlc3RpbnlaaXAgPSBwYXRoLnJlc29sdmUoYCR7YXJndi5uYW1lfS56aXBgKTtcbiAgICBjb25zdCBvdXRwdXQgPSBmcy5jcmVhdGVXcml0ZVN0cmVhbShkZXN0aW55WmlwKTtcbiAgICBjb25zdCBhcmNoaXZlID0gYXJjaGl2ZXIoJ3ppcCcpO1xuXG4gICAgb3V0cHV0Lm9uKCdjbG9zZScsICgpID0+IHtcbiAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoYCR7YXJjaGl2ZS5wb2ludGVyKCl9IHRvdGFsIGJ5dGVzIGFyY2hpdmVkYCk7XG4gICAgICAgIGRvbmUoKTtcbiAgICB9KTtcblxuICAgIGFyY2hpdmUub24oJ2Vycm9yJywgKGVycikgPT4ge1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfSk7XG5cbiAgICBhcmNoaXZlLnBpcGUob3V0cHV0KTtcbiAgICBhcmNoaXZlLmRpcmVjdG9yeShwYXRoLnJlc29sdmUoc3JjRm9sZGVyKSwgJycpO1xuICAgIGFyY2hpdmUuZmluYWxpemUoKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlVGVtcChkYXRhLCBkb25lKSB7XG4gICAgY29uc3QgdG1wRm9sZGVyID0gcGF0aC5yZXNvbHZlKGJ1aWxkVGVtcEZvbGRlck5hbWUoYXJndi5uYW1lKSk7XG5cbiAgICBmcy5yZW1vdmVTeW5jKHRtcEZvbGRlcik7XG4gICAgZG9uZSgpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFN0ZXBzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxucGxhbmlmeSh7IGV4aXQ6IHRydWUsIHJlcG9ydGVyOiBhcmd2LnJlcG9ydGVyIH0pXG4uc3RlcCgnQ2xlYW5pbmcgcHJldmlvdXMgemlwIGZpbGUnLCByZW1vdmVQcmV2aW91c0J1aWxkKVxuLnN0ZXAoJ0NvcHlpbmcgZm9sZGVyIHRvIHRlbXAgZm9sZGVyJywgY29weUZvbGRlcilcbi5zdGVwKCdSZW1vdmluZyBkZXBlbmRlbmN5IGZvbGRlcnMnLCByZW1vdmVVbm5lY2Vzc2FyeSlcbi5zdGVwKCdDb21wcmVzc2luZyBjb3BpZWQgZm9sZGVyJywgY29tcHJlc3MpXG4uc3RlcCgnUmVtb3ZpbmcgdGhlIHRlbXBvcmFyeSBmb2xkZXInLCByZW1vdmVUZW1wKVxuLnJ1bigpO1xuXG4iXX0=