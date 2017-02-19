#!/usr/bin/env node
'use strict';

require('babel-polyfill');

var yargs = require('yargs');
var planify = require('planify');
var fs = require('fs-extra');
var path = require('path');
var zipFolder = require('zip-folder');
var CWD = './';
var DEP_FOLDERS = ['bower_components', 'node_modules'];

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
    return './.tmp.' + archiveName;
}

function removePreviousBuild() {
    var zipFile = path.resolve(argv.name + '.zip');

    if (fs.existsSync(zipFile)) {
        fs.removeSync(zipFile);
        process.stdout.write('\nRemoved ' + argv.name + '.zip\n');
    } else {
        process.stdout.write('\nNo ' + argv.name + '.zip file found. Skipping...\n');
    }
}

function copyFolder(data, done) {
    var src = path.resolve(argv._[0]);
    var destination = buildTempFolderName(argv.name);

    if (src === path.resolve(CWD)) {
        throw new Error('Invalid path: must not be current working directory!');
    }

    fs.copy(src, destination, function (err) {
        if (err) {
            throw new Error(err);
        }

        process.stdout.write('\nSuccess!\n');
        done();
    });
}

function removeUnnecessary(data, done) {
    if (argv.git) {
        DEP_FOLDERS.push('.git');
        DEP_FOLDERS.push('.gitignore');
    }

    DEP_FOLDERS.forEach(function (folder) {
        var archiveFolder = path.resolve(buildTempFolderName(argv.name));
        var folderToRemove = path.resolve(archiveFolder, folder);

        fs.removeSync(folderToRemove);
    });

    process.stdout.write('\nSuccess!\n');
    done();
}

function compress(data, done) {
    var srcFolder = path.resolve(buildTempFolderName(argv.name));
    var destinyZip = path.resolve(argv.name + '.zip');

    zipFolder(srcFolder, destinyZip, function (err) {
        if (err) {
            throw new Error('Error while creating zip file');
        } else {
            process.stdout.write('\nSuccess!\n');
            done();
        }
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwieWFyZ3MiLCJwbGFuaWZ5IiwiZnMiLCJwYXRoIiwiemlwRm9sZGVyIiwiQ1dEIiwiREVQX0ZPTERFUlMiLCJhcmd2Iiwic3RyaWN0Iiwid3JhcCIsIk1hdGgiLCJtaW4iLCJ0ZXJtaW5hbFdpZHRoIiwiaGVscCIsImFsaWFzIiwidXNhZ2UiLCJvcHRpb24iLCJ0eXBlIiwiZGVmYXVsdCIsImRlbWFuZENvbW1hbmQiLCJidWlsZFRlbXBGb2xkZXJOYW1lIiwiYXJjaGl2ZU5hbWUiLCJyZW1vdmVQcmV2aW91c0J1aWxkIiwiemlwRmlsZSIsInJlc29sdmUiLCJuYW1lIiwiZXhpc3RzU3luYyIsInJlbW92ZVN5bmMiLCJwcm9jZXNzIiwic3Rkb3V0Iiwid3JpdGUiLCJjb3B5Rm9sZGVyIiwiZGF0YSIsImRvbmUiLCJzcmMiLCJfIiwiZGVzdGluYXRpb24iLCJFcnJvciIsImNvcHkiLCJlcnIiLCJyZW1vdmVVbm5lY2Vzc2FyeSIsImdpdCIsInB1c2giLCJmb3JFYWNoIiwiZm9sZGVyIiwiYXJjaGl2ZUZvbGRlciIsImZvbGRlclRvUmVtb3ZlIiwiY29tcHJlc3MiLCJzcmNGb2xkZXIiLCJkZXN0aW55WmlwIiwicmVtb3ZlVGVtcCIsInRtcEZvbGRlciIsImV4aXQiLCJyZXBvcnRlciIsInN0ZXAiLCJydW4iXSwibWFwcGluZ3MiOiI7O0FBRUFBLFFBQVEsZ0JBQVI7O0FBRUEsSUFBTUMsUUFBUUQsUUFBUSxPQUFSLENBQWQ7QUFDQSxJQUFNRSxVQUFVRixRQUFRLFNBQVIsQ0FBaEI7QUFDQSxJQUFNRyxLQUFLSCxRQUFRLFVBQVIsQ0FBWDtBQUNBLElBQU1JLE9BQU9KLFFBQVEsTUFBUixDQUFiO0FBQ0EsSUFBTUssWUFBWUwsUUFBUSxZQUFSLENBQWxCO0FBQ0EsSUFBTU0sTUFBTSxJQUFaO0FBQ0EsSUFBTUMsY0FBYyxDQUFDLGtCQUFELEVBQXFCLGNBQXJCLENBQXBCOztBQUVBO0FBQ0E7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LGNBQVU0QyxTQUFWLEVBQXFCQyxVQUFyQixFQUFpQyxVQUFDVixHQUFELEVBQVM7QUFDdEMsWUFBSUEsR0FBSixFQUFTO0FBQ0wsa0JBQU0sSUFBSUYsS0FBSixDQUFVLCtCQUFWLENBQU47QUFDSCxTQUZELE1BRU87QUFDSFQsb0JBQVFDLE1BQVIsQ0FBZUMsS0FBZixDQUFxQixjQUFyQjtBQUNBRztBQUNIO0FBQ0osS0FQRDtBQVFIOztBQUVELFNBQVNpQixVQUFULENBQW9CbEIsSUFBcEIsRUFBMEJDLElBQTFCLEVBQWdDO0FBQzVCLFFBQU1rQixZQUFZaEQsS0FBS3FCLE9BQUwsQ0FBYUosb0JBQW9CYixLQUFLa0IsSUFBekIsQ0FBYixDQUFsQjs7QUFFQXZCLE9BQUd5QixVQUFILENBQWN3QixTQUFkO0FBQ0FsQjtBQUNIOztBQUVEO0FBQ0E7QUFDQTs7QUFFQWhDLFFBQVEsRUFBRW1ELE1BQU0sSUFBUixFQUFjQyxVQUFVOUMsS0FBSzhDLFFBQTdCLEVBQVIsRUFDQ0MsSUFERCxDQUNNLDRCQUROLEVBQ29DaEMsbUJBRHBDLEVBRUNnQyxJQUZELENBRU0sK0JBRk4sRUFFdUN2QixVQUZ2QyxFQUdDdUIsSUFIRCxDQUdNLDZCQUhOLEVBR3FDZCxpQkFIckMsRUFJQ2MsSUFKRCxDQUlNLDJCQUpOLEVBSW1DUCxRQUpuQyxFQUtDTyxJQUxELENBS00sK0JBTE4sRUFLdUNKLFVBTHZDLEVBTUNLLEdBTkQiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxucmVxdWlyZSgnYmFiZWwtcG9seWZpbGwnKTtcblxuY29uc3QgeWFyZ3MgPSByZXF1aXJlKCd5YXJncycpO1xuY29uc3QgcGxhbmlmeSA9IHJlcXVpcmUoJ3BsYW5pZnknKTtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMtZXh0cmEnKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCB6aXBGb2xkZXIgPSByZXF1aXJlKCd6aXAtZm9sZGVyJyk7XG5jb25zdCBDV0QgPSAnLi8nO1xuY29uc3QgREVQX0ZPTERFUlMgPSBbJ2Jvd2VyX2NvbXBvbmVudHMnLCAnbm9kZV9tb2R1bGVzJ107XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gQ0xJIGRlZmluaXRpb25cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5jb25zdCBhcmd2ID0geWFyZ3Ncbi5zdHJpY3QoKVxuLndyYXAoTWF0aC5taW4oMTIwLCB5YXJncy50ZXJtaW5hbFdpZHRoKCkpKVxuLmhlbHAoJ2hlbHAnKS5hbGlhcygnaGVscCcsICdoJylcbi51c2FnZSgnVXNhZ2U6IC4vJDAgcGF0aC10by1jb21wcmVzcyBbb3B0aW9uc10nKVxuLm9wdGlvbignbmFtZScsIHtcbiAgICBhbGlhczogJ24nLFxuICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIGRlZmF1bHQ6ICdhcmNoaXZlJyxcbn0pXG4ub3B0aW9uKCdnaXQnLCB7XG4gICAgYWxpYXM6ICdnJyxcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgZGVmYXVsdDogZmFsc2UsXG59KVxuLmRlbWFuZENvbW1hbmQoMSwgJ1BsZWFzZSBwcm92aWRlIHRoZSBkaXJlY3RvcnkgeW91IHdoaWNoIHRvIGNvbXByZXNzLicpXG4uYXJndjtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBGdW5jdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBidWlsZFRlbXBGb2xkZXJOYW1lKGFyY2hpdmVOYW1lKSB7XG4gICAgcmV0dXJuIGAuLy50bXAuJHthcmNoaXZlTmFtZX1gO1xufVxuXG5mdW5jdGlvbiByZW1vdmVQcmV2aW91c0J1aWxkKCkge1xuICAgIGNvbnN0IHppcEZpbGUgPSBwYXRoLnJlc29sdmUoYCR7YXJndi5uYW1lfS56aXBgKTtcblxuICAgIGlmIChmcy5leGlzdHNTeW5jKHppcEZpbGUpKSB7XG4gICAgICAgIGZzLnJlbW92ZVN5bmMoemlwRmlsZSk7XG4gICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGBcXG5SZW1vdmVkICR7YXJndi5uYW1lfS56aXBcXG5gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShgXFxuTm8gJHthcmd2Lm5hbWV9LnppcCBmaWxlIGZvdW5kLiBTa2lwcGluZy4uLlxcbmApO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY29weUZvbGRlcihkYXRhLCBkb25lKSB7XG4gICAgY29uc3Qgc3JjID0gcGF0aC5yZXNvbHZlKGFyZ3YuX1swXSk7XG4gICAgY29uc3QgZGVzdGluYXRpb24gPSBidWlsZFRlbXBGb2xkZXJOYW1lKGFyZ3YubmFtZSk7XG5cbiAgICBpZiAoc3JjID09PSBwYXRoLnJlc29sdmUoQ1dEKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgcGF0aDogbXVzdCBub3QgYmUgY3VycmVudCB3b3JraW5nIGRpcmVjdG9yeSEnKTtcbiAgICB9XG5cbiAgICBmcy5jb3B5KHNyYywgZGVzdGluYXRpb24sIChlcnIpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgICAgIH1cblxuICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZSgnXFxuU3VjY2VzcyFcXG4nKTtcbiAgICAgICAgZG9uZSgpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiByZW1vdmVVbm5lY2Vzc2FyeShkYXRhLCBkb25lKSB7XG4gICAgaWYgKGFyZ3YuZ2l0KSB7XG4gICAgICAgIERFUF9GT0xERVJTLnB1c2goJy5naXQnKTtcbiAgICAgICAgREVQX0ZPTERFUlMucHVzaCgnLmdpdGlnbm9yZScpO1xuICAgIH1cblxuICAgIERFUF9GT0xERVJTLmZvckVhY2goKGZvbGRlcikgPT4ge1xuICAgICAgICBjb25zdCBhcmNoaXZlRm9sZGVyID0gcGF0aC5yZXNvbHZlKGJ1aWxkVGVtcEZvbGRlck5hbWUoYXJndi5uYW1lKSk7XG4gICAgICAgIGNvbnN0IGZvbGRlclRvUmVtb3ZlID0gcGF0aC5yZXNvbHZlKGFyY2hpdmVGb2xkZXIsIGZvbGRlcik7XG5cbiAgICAgICAgZnMucmVtb3ZlU3luYyhmb2xkZXJUb1JlbW92ZSk7XG4gICAgfSk7XG5cbiAgICBwcm9jZXNzLnN0ZG91dC53cml0ZSgnXFxuU3VjY2VzcyFcXG4nKTtcbiAgICBkb25lKCk7XG59XG5cbmZ1bmN0aW9uIGNvbXByZXNzKGRhdGEsIGRvbmUpIHtcbiAgICBjb25zdCBzcmNGb2xkZXIgPSBwYXRoLnJlc29sdmUoYnVpbGRUZW1wRm9sZGVyTmFtZShhcmd2Lm5hbWUpKTtcbiAgICBjb25zdCBkZXN0aW55WmlwID0gcGF0aC5yZXNvbHZlKGAke2FyZ3YubmFtZX0uemlwYCk7XG5cblxuICAgIHppcEZvbGRlcihzcmNGb2xkZXIsIGRlc3RpbnlaaXAsIChlcnIpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciB3aGlsZSBjcmVhdGluZyB6aXAgZmlsZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoJ1xcblN1Y2Nlc3MhXFxuJyk7XG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlVGVtcChkYXRhLCBkb25lKSB7XG4gICAgY29uc3QgdG1wRm9sZGVyID0gcGF0aC5yZXNvbHZlKGJ1aWxkVGVtcEZvbGRlck5hbWUoYXJndi5uYW1lKSk7XG5cbiAgICBmcy5yZW1vdmVTeW5jKHRtcEZvbGRlcik7XG4gICAgZG9uZSgpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFN0ZXBzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxucGxhbmlmeSh7IGV4aXQ6IHRydWUsIHJlcG9ydGVyOiBhcmd2LnJlcG9ydGVyIH0pXG4uc3RlcCgnQ2xlYW5pbmcgcHJldmlvdXMgemlwIGZpbGUnLCByZW1vdmVQcmV2aW91c0J1aWxkKVxuLnN0ZXAoJ0NvcHlpbmcgZm9sZGVyIHRvIHRlbXAgZm9sZGVyJywgY29weUZvbGRlcilcbi5zdGVwKCdSZW1vdmluZyBkZXBlbmRlbmN5IGZvbGRlcnMnLCByZW1vdmVVbm5lY2Vzc2FyeSlcbi5zdGVwKCdDb21wcmVzc2luZyBjb3BpZWQgZm9sZGVyJywgY29tcHJlc3MpXG4uc3RlcCgnUmVtb3ZpbmcgdGhlIHRlbXBvcmFyeSBmb2xkZXInLCByZW1vdmVUZW1wKVxuLnJ1bigpO1xuXG4iXX0=