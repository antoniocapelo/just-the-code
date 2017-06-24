'use strict';

var fs = require('fs-extra');
var path = require('path');
var util = require('./util');

var foldersToRemove = ['bower_components', 'node_modules'];

/**
 * Removes the previous compressed file.
 *
 * @param {String} fileName - existing file name.
 *
 */
function previousBuild(fileName) {
    var zipFile = path.resolve(fileName + '.zip');

    console.log('zipfile', zipFile);
    if (fs.existsSync(zipFile)) {
        fs.removeSync(zipFile);
        process.stdout.write('\nRemoved ' + fileName + '.zip\n');
    } else {
        process.stdout.write('\nNo ' + fileName + '.zip file found. Skipping...\n');
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

    foldersToRemove.forEach(function (folder) {
        var archiveFolder = path.resolve(util.buildTempFolderName(name));
        var folderToRemove = path.resolve(archiveFolder, folder);

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
    var tmpFolder = path.resolve(util.buildTempFolderName(name));

    fs.removeSync(tmpFolder);

    done();
}

module.exports = {
    previousBuild: previousBuild,
    unnecessary: unnecessary,
    temporary: temporary
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZW1vdmUuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwicGF0aCIsInV0aWwiLCJmb2xkZXJzVG9SZW1vdmUiLCJwcmV2aW91c0J1aWxkIiwiZmlsZU5hbWUiLCJ6aXBGaWxlIiwicmVzb2x2ZSIsImNvbnNvbGUiLCJsb2ciLCJleGlzdHNTeW5jIiwicmVtb3ZlU3luYyIsInByb2Nlc3MiLCJzdGRvdXQiLCJ3cml0ZSIsInVubmVjZXNzYXJ5IiwibmFtZSIsImdpdEZsYWciLCJkYXRhIiwiZG9uZSIsInB1c2giLCJmb3JFYWNoIiwiZm9sZGVyIiwiYXJjaGl2ZUZvbGRlciIsImJ1aWxkVGVtcEZvbGRlck5hbWUiLCJmb2xkZXJUb1JlbW92ZSIsInRlbXBvcmFyeSIsInRtcEZvbGRlciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTUEsS0FBS0MsUUFBUSxVQUFSLENBQVg7QUFDQSxJQUFNQyxPQUFPRCxRQUFRLE1BQVIsQ0FBYjtBQUNBLElBQU1FLE9BQU9GLFFBQVEsUUFBUixDQUFiOztBQUVBLElBQU1HLGtCQUFrQixDQUFDLGtCQUFELEVBQXFCLGNBQXJCLENBQXhCOztBQUVBOzs7Ozs7QUFNQSxTQUFTQyxhQUFULENBQXVCQyxRQUF2QixFQUFpQztBQUM3QixRQUFNQyxVQUFVTCxLQUFLTSxPQUFMLENBQWdCRixRQUFoQixVQUFoQjs7QUFFQUcsWUFBUUMsR0FBUixDQUFZLFNBQVosRUFBdUJILE9BQXZCO0FBQ0EsUUFBSVAsR0FBR1csVUFBSCxDQUFjSixPQUFkLENBQUosRUFBNEI7QUFDeEJQLFdBQUdZLFVBQUgsQ0FBY0wsT0FBZDtBQUNBTSxnQkFBUUMsTUFBUixDQUFlQyxLQUFmLGdCQUFrQ1QsUUFBbEM7QUFDSCxLQUhELE1BR087QUFDSE8sZ0JBQVFDLE1BQVIsQ0FBZUMsS0FBZixXQUE2QlQsUUFBN0I7QUFDSDtBQUNKOztBQUVEOzs7Ozs7Ozs7QUFTQSxTQUFTVSxXQUFULENBQXFCQyxJQUFyQixFQUEyQkMsT0FBM0IsRUFBb0NDLElBQXBDLEVBQTBDQyxJQUExQyxFQUFnRDtBQUM1QyxRQUFJRixPQUFKLEVBQWE7QUFDVGQsd0JBQWdCaUIsSUFBaEIsQ0FBcUIsTUFBckI7QUFDQWpCLHdCQUFnQmlCLElBQWhCLENBQXFCLFlBQXJCO0FBQ0g7O0FBRURqQixvQkFBZ0JrQixPQUFoQixDQUF3QixVQUFDQyxNQUFELEVBQVk7QUFDaEMsWUFBTUMsZ0JBQWdCdEIsS0FBS00sT0FBTCxDQUFhTCxLQUFLc0IsbUJBQUwsQ0FBeUJSLElBQXpCLENBQWIsQ0FBdEI7QUFDQSxZQUFNUyxpQkFBaUJ4QixLQUFLTSxPQUFMLENBQWFnQixhQUFiLEVBQTRCRCxNQUE1QixDQUF2Qjs7QUFFQXZCLFdBQUdZLFVBQUgsQ0FBY2MsY0FBZDtBQUNILEtBTEQ7O0FBT0FiLFlBQVFDLE1BQVIsQ0FBZUMsS0FBZixDQUFxQixjQUFyQjtBQUNBSztBQUNIOztBQUVEOzs7Ozs7OztBQVFBLFNBQVNPLFNBQVQsQ0FBbUJWLElBQW5CLEVBQXlCRSxJQUF6QixFQUErQkMsSUFBL0IsRUFBcUM7QUFDakMsUUFBTVEsWUFBWTFCLEtBQUtNLE9BQUwsQ0FBYUwsS0FBS3NCLG1CQUFMLENBQXlCUixJQUF6QixDQUFiLENBQWxCOztBQUVBakIsT0FBR1ksVUFBSCxDQUFjZ0IsU0FBZDs7QUFFQVI7QUFDSDs7QUFHRFMsT0FBT0MsT0FBUCxHQUFpQjtBQUNiekIsZ0NBRGE7QUFFYlcsNEJBRmE7QUFHYlc7QUFIYSxDQUFqQiIsImZpbGUiOiJyZW1vdmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzLWV4dHJhJyk7XG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuY29uc3QgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuXG5jb25zdCBmb2xkZXJzVG9SZW1vdmUgPSBbJ2Jvd2VyX2NvbXBvbmVudHMnLCAnbm9kZV9tb2R1bGVzJ107XG5cbi8qKlxuICogUmVtb3ZlcyB0aGUgcHJldmlvdXMgY29tcHJlc3NlZCBmaWxlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlTmFtZSAtIGV4aXN0aW5nIGZpbGUgbmFtZS5cbiAqXG4gKi9cbmZ1bmN0aW9uIHByZXZpb3VzQnVpbGQoZmlsZU5hbWUpIHtcbiAgICBjb25zdCB6aXBGaWxlID0gcGF0aC5yZXNvbHZlKGAke2ZpbGVOYW1lfS56aXBgKTtcblxuICAgIGNvbnNvbGUubG9nKCd6aXBmaWxlJywgemlwRmlsZSk7XG4gICAgaWYgKGZzLmV4aXN0c1N5bmMoemlwRmlsZSkpIHtcbiAgICAgICAgZnMucmVtb3ZlU3luYyh6aXBGaWxlKTtcbiAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoYFxcblJlbW92ZWQgJHtmaWxlTmFtZX0uemlwXFxuYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoYFxcbk5vICR7ZmlsZU5hbWV9LnppcCBmaWxlIGZvdW5kLiBTa2lwcGluZy4uLlxcbmApO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIHVubmVjZXNzYXJ5IGZpbGVzIChib3dlci9ub2RlKSBmcm9tIHRlbXBvcmFyeSBmb2xkZXIuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSB0YXJnZXQgbmFtZS5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZ2l0RmxhZyAtIHdldGhlciB0byByZW1vdmUgZ2l0LXJlbGF0ZWQgZmlsZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gW2RhdGFdIC0gUGxhbmlmeSBwYXNzZWQgZGF0YS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGRvbmUgLSBQbGFuaWZ5ICdkb25lJyBjYWxsYmFjay5cbiAqXG4gKi9cbmZ1bmN0aW9uIHVubmVjZXNzYXJ5KG5hbWUsIGdpdEZsYWcsIGRhdGEsIGRvbmUpIHtcbiAgICBpZiAoZ2l0RmxhZykge1xuICAgICAgICBmb2xkZXJzVG9SZW1vdmUucHVzaCgnLmdpdCcpO1xuICAgICAgICBmb2xkZXJzVG9SZW1vdmUucHVzaCgnLmdpdGlnbm9yZScpO1xuICAgIH1cblxuICAgIGZvbGRlcnNUb1JlbW92ZS5mb3JFYWNoKChmb2xkZXIpID0+IHtcbiAgICAgICAgY29uc3QgYXJjaGl2ZUZvbGRlciA9IHBhdGgucmVzb2x2ZSh1dGlsLmJ1aWxkVGVtcEZvbGRlck5hbWUobmFtZSkpO1xuICAgICAgICBjb25zdCBmb2xkZXJUb1JlbW92ZSA9IHBhdGgucmVzb2x2ZShhcmNoaXZlRm9sZGVyLCBmb2xkZXIpO1xuXG4gICAgICAgIGZzLnJlbW92ZVN5bmMoZm9sZGVyVG9SZW1vdmUpO1xuICAgIH0pO1xuXG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoJ1xcblN1Y2Nlc3MhXFxuJyk7XG4gICAgZG9uZSgpO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgdGVtcG9yYXJ5IGZvbGRlci5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIHRlbXBvcmFyeSBmb2xkZXIgbmFtZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbZGF0YV0gLSBQbGFuaWZ5IHBhc3NlZCBkYXRhLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZG9uZSAtIFBsYW5pZnkgJ2RvbmUnIGNhbGxiYWNrLlxuICpcbiAqL1xuZnVuY3Rpb24gdGVtcG9yYXJ5KG5hbWUsIGRhdGEsIGRvbmUpIHtcbiAgICBjb25zdCB0bXBGb2xkZXIgPSBwYXRoLnJlc29sdmUodXRpbC5idWlsZFRlbXBGb2xkZXJOYW1lKG5hbWUpKTtcblxuICAgIGZzLnJlbW92ZVN5bmModG1wRm9sZGVyKTtcblxuICAgIGRvbmUoKTtcbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBwcmV2aW91c0J1aWxkLFxuICAgIHVubmVjZXNzYXJ5LFxuICAgIHRlbXBvcmFyeSxcbn07XG4iXX0=