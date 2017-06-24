'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = compress;
var fs = require('fs-extra');
var path = require('path');
var archiver = require('archiver');
var util = require('./util');

/**
 * Compresses the temporary folder into a [name].zip file.
 *
 * @param {String} name - desired compressed file name.
 * @param {Object} [data] - Planify passed data.
 * @param {Function} done - Planify 'done' callback.
 *
 */
function compress(name, data, done) {
    var srcFolder = util.buildTempFolderName(name);
    var destinyZip = path.resolve(name + '.zip');
    var output = fs.createWriteStream(destinyZip);
    var archive = archiver('zip');

    output.on('close', function () {
        process.stdout.write(archive.pointer() + ' total bytes archived');
        done();
    });

    archive.on('error', function (err) {
        process.stdout.write('An error occurred: ' + err);
        fs.removeSync(path.resolve(destinyZip));

        done(new Error('Archiver error:' + err));
    });

    archive.pipe(output);
    archive.directory(path.resolve(srcFolder), '');
    archive.finalize();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wcmVzcy5qcyJdLCJuYW1lcyI6WyJjb21wcmVzcyIsImZzIiwicmVxdWlyZSIsInBhdGgiLCJhcmNoaXZlciIsInV0aWwiLCJuYW1lIiwiZGF0YSIsImRvbmUiLCJzcmNGb2xkZXIiLCJidWlsZFRlbXBGb2xkZXJOYW1lIiwiZGVzdGlueVppcCIsInJlc29sdmUiLCJvdXRwdXQiLCJjcmVhdGVXcml0ZVN0cmVhbSIsImFyY2hpdmUiLCJvbiIsInByb2Nlc3MiLCJzdGRvdXQiLCJ3cml0ZSIsInBvaW50ZXIiLCJlcnIiLCJyZW1vdmVTeW5jIiwiRXJyb3IiLCJwaXBlIiwiZGlyZWN0b3J5IiwiZmluYWxpemUiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQWF3QkEsUTtBQWJ4QixJQUFNQyxLQUFLQyxRQUFRLFVBQVIsQ0FBWDtBQUNBLElBQU1DLE9BQU9ELFFBQVEsTUFBUixDQUFiO0FBQ0EsSUFBTUUsV0FBV0YsUUFBUSxVQUFSLENBQWpCO0FBQ0EsSUFBTUcsT0FBT0gsUUFBUSxRQUFSLENBQWI7O0FBRUE7Ozs7Ozs7O0FBUWUsU0FBU0YsUUFBVCxDQUFrQk0sSUFBbEIsRUFBd0JDLElBQXhCLEVBQThCQyxJQUE5QixFQUFvQztBQUMvQyxRQUFNQyxZQUFZSixLQUFLSyxtQkFBTCxDQUF5QkosSUFBekIsQ0FBbEI7QUFDQSxRQUFNSyxhQUFhUixLQUFLUyxPQUFMLENBQWdCTixJQUFoQixVQUFuQjtBQUNBLFFBQU1PLFNBQVNaLEdBQUdhLGlCQUFILENBQXFCSCxVQUFyQixDQUFmO0FBQ0EsUUFBTUksVUFBVVgsU0FBUyxLQUFULENBQWhCOztBQUVBUyxXQUFPRyxFQUFQLENBQVUsT0FBVixFQUFtQixZQUFNO0FBQ3JCQyxnQkFBUUMsTUFBUixDQUFlQyxLQUFmLENBQXdCSixRQUFRSyxPQUFSLEVBQXhCO0FBQ0FaO0FBQ0gsS0FIRDs7QUFLQU8sWUFBUUMsRUFBUixDQUFXLE9BQVgsRUFBb0IsVUFBQ0ssR0FBRCxFQUFTO0FBQ3pCSixnQkFBUUMsTUFBUixDQUFlQyxLQUFmLHlCQUEyQ0UsR0FBM0M7QUFDQXBCLFdBQUdxQixVQUFILENBQWNuQixLQUFLUyxPQUFMLENBQWFELFVBQWIsQ0FBZDs7QUFFQUgsYUFBSyxJQUFJZSxLQUFKLENBQVUsb0JBQW9CRixHQUE5QixDQUFMO0FBQ0gsS0FMRDs7QUFPQU4sWUFBUVMsSUFBUixDQUFhWCxNQUFiO0FBQ0FFLFlBQVFVLFNBQVIsQ0FBa0J0QixLQUFLUyxPQUFMLENBQWFILFNBQWIsQ0FBbEIsRUFBMkMsRUFBM0M7QUFDQU0sWUFBUVcsUUFBUjtBQUNIIiwiZmlsZSI6ImNvbXByZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZnMgPSByZXF1aXJlKCdmcy1leHRyYScpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IGFyY2hpdmVyID0gcmVxdWlyZSgnYXJjaGl2ZXInKTtcbmNvbnN0IHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcblxuLyoqXG4gKiBDb21wcmVzc2VzIHRoZSB0ZW1wb3JhcnkgZm9sZGVyIGludG8gYSBbbmFtZV0uemlwIGZpbGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBkZXNpcmVkIGNvbXByZXNzZWQgZmlsZSBuYW1lLlxuICogQHBhcmFtIHtPYmplY3R9IFtkYXRhXSAtIFBsYW5pZnkgcGFzc2VkIGRhdGEuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBkb25lIC0gUGxhbmlmeSAnZG9uZScgY2FsbGJhY2suXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21wcmVzcyhuYW1lLCBkYXRhLCBkb25lKSB7XG4gICAgY29uc3Qgc3JjRm9sZGVyID0gdXRpbC5idWlsZFRlbXBGb2xkZXJOYW1lKG5hbWUpO1xuICAgIGNvbnN0IGRlc3RpbnlaaXAgPSBwYXRoLnJlc29sdmUoYCR7bmFtZX0uemlwYCk7XG4gICAgY29uc3Qgb3V0cHV0ID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0oZGVzdGlueVppcCk7XG4gICAgY29uc3QgYXJjaGl2ZSA9IGFyY2hpdmVyKCd6aXAnKTtcblxuICAgIG91dHB1dC5vbignY2xvc2UnLCAoKSA9PiB7XG4gICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGAke2FyY2hpdmUucG9pbnRlcigpfSB0b3RhbCBieXRlcyBhcmNoaXZlZGApO1xuICAgICAgICBkb25lKCk7XG4gICAgfSk7XG5cbiAgICBhcmNoaXZlLm9uKCdlcnJvcicsIChlcnIpID0+IHtcbiAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoYEFuIGVycm9yIG9jY3VycmVkOiAke2Vycn1gKTtcbiAgICAgICAgZnMucmVtb3ZlU3luYyhwYXRoLnJlc29sdmUoZGVzdGlueVppcCkpO1xuXG4gICAgICAgIGRvbmUobmV3IEVycm9yKCdBcmNoaXZlciBlcnJvcjonICsgZXJyKSk7XG4gICAgfSk7XG5cbiAgICBhcmNoaXZlLnBpcGUob3V0cHV0KTtcbiAgICBhcmNoaXZlLmRpcmVjdG9yeShwYXRoLnJlc29sdmUoc3JjRm9sZGVyKSwgJycpO1xuICAgIGFyY2hpdmUuZmluYWxpemUoKTtcbn1cblxuIl19