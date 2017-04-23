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

    if (fs.existsSync(zipFile)) {
        fs.unlink(zipFile, function (err) {
            if (err) {
                throw err;
            }

            process.stdout.write('\nRemoved ' + fileName + '.zip\n');
        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZW1vdmUuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwicGF0aCIsInV0aWwiLCJmb2xkZXJzVG9SZW1vdmUiLCJwcmV2aW91c0J1aWxkIiwiZmlsZU5hbWUiLCJ6aXBGaWxlIiwicmVzb2x2ZSIsImV4aXN0c1N5bmMiLCJ1bmxpbmsiLCJlcnIiLCJwcm9jZXNzIiwic3Rkb3V0Iiwid3JpdGUiLCJ1bm5lY2Vzc2FyeSIsIm5hbWUiLCJnaXRGbGFnIiwiZGF0YSIsImRvbmUiLCJwdXNoIiwiZm9yRWFjaCIsImZvbGRlciIsImFyY2hpdmVGb2xkZXIiLCJidWlsZFRlbXBGb2xkZXJOYW1lIiwiZm9sZGVyVG9SZW1vdmUiLCJyZW1vdmVTeW5jIiwidGVtcG9yYXJ5IiwidG1wRm9sZGVyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNQSxLQUFLQyxRQUFRLFVBQVIsQ0FBWDtBQUNBLElBQU1DLE9BQU9ELFFBQVEsTUFBUixDQUFiO0FBQ0EsSUFBTUUsT0FBT0YsUUFBUSxRQUFSLENBQWI7O0FBRUEsSUFBTUcsa0JBQWtCLENBQUMsa0JBQUQsRUFBcUIsY0FBckIsQ0FBeEI7O0FBRUE7Ozs7OztBQU1BLFNBQVNDLGFBQVQsQ0FBdUJDLFFBQXZCLEVBQWlDO0FBQzdCLFFBQU1DLFVBQVVMLEtBQUtNLE9BQUwsQ0FBZ0JGLFFBQWhCLFVBQWhCOztBQUVBLFFBQUlOLEdBQUdTLFVBQUgsQ0FBY0YsT0FBZCxDQUFKLEVBQTRCO0FBQ3hCUCxXQUFHVSxNQUFILENBQVVILE9BQVYsRUFBbUIsVUFBQ0ksR0FBRCxFQUFTO0FBQ3hCLGdCQUFJQSxHQUFKLEVBQVM7QUFDTCxzQkFBTUEsR0FBTjtBQUNIOztBQUVEQyxvQkFBUUMsTUFBUixDQUFlQyxLQUFmLGdCQUFrQ1IsUUFBbEM7QUFDSCxTQU5EO0FBT0gsS0FSRCxNQVFPO0FBQ0hNLGdCQUFRQyxNQUFSLENBQWVDLEtBQWYsV0FBNkJSLFFBQTdCO0FBQ0g7QUFDSjs7QUFFRDs7Ozs7Ozs7O0FBU0EsU0FBU1MsV0FBVCxDQUFxQkMsSUFBckIsRUFBMkJDLE9BQTNCLEVBQW9DQyxJQUFwQyxFQUEwQ0MsSUFBMUMsRUFBZ0Q7QUFDNUMsUUFBSUYsT0FBSixFQUFhO0FBQ1RiLHdCQUFnQmdCLElBQWhCLENBQXFCLE1BQXJCO0FBQ0FoQix3QkFBZ0JnQixJQUFoQixDQUFxQixZQUFyQjtBQUNIOztBQUVEaEIsb0JBQWdCaUIsT0FBaEIsQ0FBd0IsVUFBQ0MsTUFBRCxFQUFZO0FBQ2hDLFlBQU1DLGdCQUFnQnJCLEtBQUtNLE9BQUwsQ0FBYUwsS0FBS3FCLG1CQUFMLENBQXlCUixJQUF6QixDQUFiLENBQXRCO0FBQ0EsWUFBTVMsaUJBQWlCdkIsS0FBS00sT0FBTCxDQUFhZSxhQUFiLEVBQTRCRCxNQUE1QixDQUF2Qjs7QUFFQXRCLFdBQUcwQixVQUFILENBQWNELGNBQWQ7QUFDSCxLQUxEOztBQU9BYixZQUFRQyxNQUFSLENBQWVDLEtBQWYsQ0FBcUIsY0FBckI7QUFDQUs7QUFDSDs7QUFFRDs7Ozs7Ozs7QUFRQSxTQUFTUSxTQUFULENBQW1CWCxJQUFuQixFQUF5QkUsSUFBekIsRUFBK0JDLElBQS9CLEVBQXFDO0FBQ2pDLFFBQU1TLFlBQVkxQixLQUFLTSxPQUFMLENBQWFMLEtBQUtxQixtQkFBTCxDQUF5QlIsSUFBekIsQ0FBYixDQUFsQjs7QUFFQWhCLE9BQUcwQixVQUFILENBQWNFLFNBQWQ7O0FBRUFUO0FBQ0g7O0FBR0RVLE9BQU9DLE9BQVAsR0FBaUI7QUFDYnpCLGdDQURhO0FBRWJVLDRCQUZhO0FBR2JZO0FBSGEsQ0FBakIiLCJmaWxlIjoicmVtb3ZlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZnMgPSByZXF1aXJlKCdmcy1leHRyYScpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcblxuY29uc3QgZm9sZGVyc1RvUmVtb3ZlID0gWydib3dlcl9jb21wb25lbnRzJywgJ25vZGVfbW9kdWxlcyddO1xuXG4vKipcbiAqIFJlbW92ZXMgdGhlIHByZXZpb3VzIGNvbXByZXNzZWQgZmlsZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmlsZU5hbWUgLSBleGlzdGluZyBmaWxlIG5hbWUuXG4gKlxuICovXG5mdW5jdGlvbiBwcmV2aW91c0J1aWxkKGZpbGVOYW1lKSB7XG4gICAgY29uc3QgemlwRmlsZSA9IHBhdGgucmVzb2x2ZShgJHtmaWxlTmFtZX0uemlwYCk7XG5cbiAgICBpZiAoZnMuZXhpc3RzU3luYyh6aXBGaWxlKSkge1xuICAgICAgICBmcy51bmxpbmsoemlwRmlsZSwgKGVycikgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoYFxcblJlbW92ZWQgJHtmaWxlTmFtZX0uemlwXFxuYCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGBcXG5ObyAke2ZpbGVOYW1lfS56aXAgZmlsZSBmb3VuZC4gU2tpcHBpbmcuLi5cXG5gKTtcbiAgICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyB1bm5lY2Vzc2FyeSBmaWxlcyAoYm93ZXIvbm9kZSkgZnJvbSB0ZW1wb3JhcnkgZm9sZGVyLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gdGFyZ2V0IG5hbWUuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGdpdEZsYWcgLSB3ZXRoZXIgdG8gcmVtb3ZlIGdpdC1yZWxhdGVkIGZpbGVzLlxuICogQHBhcmFtIHtPYmplY3R9IFtkYXRhXSAtIFBsYW5pZnkgcGFzc2VkIGRhdGEuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBkb25lIC0gUGxhbmlmeSAnZG9uZScgY2FsbGJhY2suXG4gKlxuICovXG5mdW5jdGlvbiB1bm5lY2Vzc2FyeShuYW1lLCBnaXRGbGFnLCBkYXRhLCBkb25lKSB7XG4gICAgaWYgKGdpdEZsYWcpIHtcbiAgICAgICAgZm9sZGVyc1RvUmVtb3ZlLnB1c2goJy5naXQnKTtcbiAgICAgICAgZm9sZGVyc1RvUmVtb3ZlLnB1c2goJy5naXRpZ25vcmUnKTtcbiAgICB9XG5cbiAgICBmb2xkZXJzVG9SZW1vdmUuZm9yRWFjaCgoZm9sZGVyKSA9PiB7XG4gICAgICAgIGNvbnN0IGFyY2hpdmVGb2xkZXIgPSBwYXRoLnJlc29sdmUodXRpbC5idWlsZFRlbXBGb2xkZXJOYW1lKG5hbWUpKTtcbiAgICAgICAgY29uc3QgZm9sZGVyVG9SZW1vdmUgPSBwYXRoLnJlc29sdmUoYXJjaGl2ZUZvbGRlciwgZm9sZGVyKTtcblxuICAgICAgICBmcy5yZW1vdmVTeW5jKGZvbGRlclRvUmVtb3ZlKTtcbiAgICB9KTtcblxuICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKCdcXG5TdWNjZXNzIVxcbicpO1xuICAgIGRvbmUoKTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIHRlbXBvcmFyeSBmb2xkZXIuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSB0ZW1wb3JhcnkgZm9sZGVyIG5hbWUuXG4gKiBAcGFyYW0ge09iamVjdH0gW2RhdGFdIC0gUGxhbmlmeSBwYXNzZWQgZGF0YS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGRvbmUgLSBQbGFuaWZ5ICdkb25lJyBjYWxsYmFjay5cbiAqXG4gKi9cbmZ1bmN0aW9uIHRlbXBvcmFyeShuYW1lLCBkYXRhLCBkb25lKSB7XG4gICAgY29uc3QgdG1wRm9sZGVyID0gcGF0aC5yZXNvbHZlKHV0aWwuYnVpbGRUZW1wRm9sZGVyTmFtZShuYW1lKSk7XG5cbiAgICBmcy5yZW1vdmVTeW5jKHRtcEZvbGRlcik7XG5cbiAgICBkb25lKCk7XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgcHJldmlvdXNCdWlsZCxcbiAgICB1bm5lY2Vzc2FyeSxcbiAgICB0ZW1wb3JhcnksXG59O1xuIl19