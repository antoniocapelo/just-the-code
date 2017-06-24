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
 * @returns {Object} Archiver object.
 *
 */
function compress(name, data, done) {
    var srcFolder = util.buildTempFolderName(name);
    var destinyZip = path.resolve(name + '.zip');
    var output = fs.createWriteStream(destinyZip);
    var archive = archiver('zip');

    if (!fs.existsSync(path.resolve(srcFolder))) {
        throw new Error('Source folder does not exist');
    }

    output.on('close', function () {
        process.stdout.write(archive.pointer() + ' total bytes archived');
        done();
    });

    archive.on('error', function (err) {
        process.stdout.write('An error occurred: ' + err);
        fs.removeSync(path.resolve(destinyZip));
        done(new Error('Archiver error: ' + err));
    });

    archive.pipe(output);
    archive.directory(path.resolve(srcFolder), '');
    archive.finalize();
    return archive;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wcmVzcy5qcyJdLCJuYW1lcyI6WyJjb21wcmVzcyIsImZzIiwicmVxdWlyZSIsInBhdGgiLCJhcmNoaXZlciIsInV0aWwiLCJuYW1lIiwiZGF0YSIsImRvbmUiLCJzcmNGb2xkZXIiLCJidWlsZFRlbXBGb2xkZXJOYW1lIiwiZGVzdGlueVppcCIsInJlc29sdmUiLCJvdXRwdXQiLCJjcmVhdGVXcml0ZVN0cmVhbSIsImFyY2hpdmUiLCJleGlzdHNTeW5jIiwiRXJyb3IiLCJvbiIsInByb2Nlc3MiLCJzdGRvdXQiLCJ3cml0ZSIsInBvaW50ZXIiLCJlcnIiLCJyZW1vdmVTeW5jIiwicGlwZSIsImRpcmVjdG9yeSIsImZpbmFsaXplIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFld0JBLFE7QUFmeEIsSUFBTUMsS0FBS0MsUUFBUSxVQUFSLENBQVg7QUFDQSxJQUFNQyxPQUFPRCxRQUFRLE1BQVIsQ0FBYjtBQUNBLElBQU1FLFdBQVdGLFFBQVEsVUFBUixDQUFqQjtBQUNBLElBQU1HLE9BQU9ILFFBQVEsUUFBUixDQUFiOztBQUVBOzs7Ozs7Ozs7O0FBVWUsU0FBU0YsUUFBVCxDQUFrQk0sSUFBbEIsRUFBd0JDLElBQXhCLEVBQThCQyxJQUE5QixFQUFvQztBQUMvQyxRQUFNQyxZQUFZSixLQUFLSyxtQkFBTCxDQUF5QkosSUFBekIsQ0FBbEI7QUFDQSxRQUFNSyxhQUFhUixLQUFLUyxPQUFMLENBQWdCTixJQUFoQixVQUFuQjtBQUNBLFFBQU1PLFNBQVNaLEdBQUdhLGlCQUFILENBQXFCSCxVQUFyQixDQUFmO0FBQ0EsUUFBTUksVUFBVVgsU0FBUyxLQUFULENBQWhCOztBQUVBLFFBQUksQ0FBQ0gsR0FBR2UsVUFBSCxDQUFjYixLQUFLUyxPQUFMLENBQWFILFNBQWIsQ0FBZCxDQUFMLEVBQTZDO0FBQ3pDLGNBQU0sSUFBSVEsS0FBSixDQUFVLDhCQUFWLENBQU47QUFDSDs7QUFFREosV0FBT0ssRUFBUCxDQUFVLE9BQVYsRUFBbUIsWUFBTTtBQUNyQkMsZ0JBQVFDLE1BQVIsQ0FBZUMsS0FBZixDQUF3Qk4sUUFBUU8sT0FBUixFQUF4QjtBQUNBZDtBQUNILEtBSEQ7O0FBS0FPLFlBQVFHLEVBQVIsQ0FBVyxPQUFYLEVBQW9CLFVBQUNLLEdBQUQsRUFBUztBQUN6QkosZ0JBQVFDLE1BQVIsQ0FBZUMsS0FBZix5QkFBMkNFLEdBQTNDO0FBQ0F0QixXQUFHdUIsVUFBSCxDQUFjckIsS0FBS1MsT0FBTCxDQUFhRCxVQUFiLENBQWQ7QUFDQUgsYUFBSyxJQUFJUyxLQUFKLHNCQUE2Qk0sR0FBN0IsQ0FBTDtBQUNILEtBSkQ7O0FBTUFSLFlBQVFVLElBQVIsQ0FBYVosTUFBYjtBQUNBRSxZQUFRVyxTQUFSLENBQWtCdkIsS0FBS1MsT0FBTCxDQUFhSCxTQUFiLENBQWxCLEVBQTJDLEVBQTNDO0FBQ0FNLFlBQVFZLFFBQVI7QUFDQSxXQUFPWixPQUFQO0FBQ0giLCJmaWxlIjoiY29tcHJlc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzLWV4dHJhJyk7XG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuY29uc3QgYXJjaGl2ZXIgPSByZXF1aXJlKCdhcmNoaXZlcicpO1xuY29uc3QgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuXG4vKipcbiAqIENvbXByZXNzZXMgdGhlIHRlbXBvcmFyeSBmb2xkZXIgaW50byBhIFtuYW1lXS56aXAgZmlsZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIGRlc2lyZWQgY29tcHJlc3NlZCBmaWxlIG5hbWUuXG4gKiBAcGFyYW0ge09iamVjdH0gW2RhdGFdIC0gUGxhbmlmeSBwYXNzZWQgZGF0YS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGRvbmUgLSBQbGFuaWZ5ICdkb25lJyBjYWxsYmFjay5cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBBcmNoaXZlciBvYmplY3QuXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21wcmVzcyhuYW1lLCBkYXRhLCBkb25lKSB7XG4gICAgY29uc3Qgc3JjRm9sZGVyID0gdXRpbC5idWlsZFRlbXBGb2xkZXJOYW1lKG5hbWUpO1xuICAgIGNvbnN0IGRlc3RpbnlaaXAgPSBwYXRoLnJlc29sdmUoYCR7bmFtZX0uemlwYCk7XG4gICAgY29uc3Qgb3V0cHV0ID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0oZGVzdGlueVppcCk7XG4gICAgY29uc3QgYXJjaGl2ZSA9IGFyY2hpdmVyKCd6aXAnKTtcblxuICAgIGlmICghZnMuZXhpc3RzU3luYyhwYXRoLnJlc29sdmUoc3JjRm9sZGVyKSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3VyY2UgZm9sZGVyIGRvZXMgbm90IGV4aXN0Jyk7XG4gICAgfVxuXG4gICAgb3V0cHV0Lm9uKCdjbG9zZScsICgpID0+IHtcbiAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoYCR7YXJjaGl2ZS5wb2ludGVyKCl9IHRvdGFsIGJ5dGVzIGFyY2hpdmVkYCk7XG4gICAgICAgIGRvbmUoKTtcbiAgICB9KTtcblxuICAgIGFyY2hpdmUub24oJ2Vycm9yJywgKGVycikgPT4ge1xuICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShgQW4gZXJyb3Igb2NjdXJyZWQ6ICR7ZXJyfWApO1xuICAgICAgICBmcy5yZW1vdmVTeW5jKHBhdGgucmVzb2x2ZShkZXN0aW55WmlwKSk7XG4gICAgICAgIGRvbmUobmV3IEVycm9yKGBBcmNoaXZlciBlcnJvcjogJHtlcnJ9YCkpO1xuICAgIH0pO1xuXG4gICAgYXJjaGl2ZS5waXBlKG91dHB1dCk7XG4gICAgYXJjaGl2ZS5kaXJlY3RvcnkocGF0aC5yZXNvbHZlKHNyY0ZvbGRlciksICcnKTtcbiAgICBhcmNoaXZlLmZpbmFsaXplKCk7XG4gICAgcmV0dXJuIGFyY2hpdmU7XG59XG5cbiJdfQ==