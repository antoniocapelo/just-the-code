'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = copyFolder;
var util = require('./util');
var path = require('path');
var fs = require('fs-extra');

/**
 * Copies source folder into temporary.
 *
 * @param {String} src - source folder.
 * @param {String} name - target file name.
 * @param {Object} [data] - Planify passed data.
 * @param {Function} done - Planify 'done' callback.
 *
 */
function copyFolder(src, name, data, done) {
    var srcPath = path.resolve(src);
    var destination = util.buildTempFolderName(name);

    if (srcPath === process.cwd()) {
        throw new Error('Invalid path: must not be current working directory!');
    }

    fs.copy(srcPath, destination, function (err) {
        if (err) {
            fs.removeSync(path.resolve(destination));
        } else {
            process.stdout.write('\nSuccess!\n');
        }

        done(err);
    });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb3B5LmpzIl0sIm5hbWVzIjpbImNvcHlGb2xkZXIiLCJ1dGlsIiwicmVxdWlyZSIsInBhdGgiLCJmcyIsInNyYyIsIm5hbWUiLCJkYXRhIiwiZG9uZSIsInNyY1BhdGgiLCJyZXNvbHZlIiwiZGVzdGluYXRpb24iLCJidWlsZFRlbXBGb2xkZXJOYW1lIiwicHJvY2VzcyIsImN3ZCIsIkVycm9yIiwiY29weSIsImVyciIsInJlbW92ZVN5bmMiLCJzdGRvdXQiLCJ3cml0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBYXdCQSxVO0FBYnhCLElBQU1DLE9BQU9DLFFBQVEsUUFBUixDQUFiO0FBQ0EsSUFBTUMsT0FBT0QsUUFBUSxNQUFSLENBQWI7QUFDQSxJQUFNRSxLQUFLRixRQUFRLFVBQVIsQ0FBWDs7QUFFQTs7Ozs7Ozs7O0FBU2UsU0FBU0YsVUFBVCxDQUFvQkssR0FBcEIsRUFBeUJDLElBQXpCLEVBQStCQyxJQUEvQixFQUFxQ0MsSUFBckMsRUFBMkM7QUFDdEQsUUFBTUMsVUFBVU4sS0FBS08sT0FBTCxDQUFhTCxHQUFiLENBQWhCO0FBQ0EsUUFBTU0sY0FBY1YsS0FBS1csbUJBQUwsQ0FBeUJOLElBQXpCLENBQXBCOztBQUVBLFFBQUlHLFlBQVlJLFFBQVFDLEdBQVIsRUFBaEIsRUFBK0I7QUFDM0IsY0FBTSxJQUFJQyxLQUFKLENBQVUsc0RBQVYsQ0FBTjtBQUNIOztBQUVEWCxPQUFHWSxJQUFILENBQVFQLE9BQVIsRUFBaUJFLFdBQWpCLEVBQThCLFVBQUNNLEdBQUQsRUFBUztBQUNuQyxZQUFJQSxHQUFKLEVBQVM7QUFDTGIsZUFBR2MsVUFBSCxDQUFjZixLQUFLTyxPQUFMLENBQWFDLFdBQWIsQ0FBZDtBQUNILFNBRkQsTUFFTztBQUNIRSxvQkFBUU0sTUFBUixDQUFlQyxLQUFmLENBQXFCLGNBQXJCO0FBQ0g7O0FBRURaLGFBQUtTLEdBQUw7QUFDSCxLQVJEO0FBU0giLCJmaWxlIjoiY29weS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzLWV4dHJhJyk7XG5cbi8qKlxuICogQ29waWVzIHNvdXJjZSBmb2xkZXIgaW50byB0ZW1wb3JhcnkuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHNyYyAtIHNvdXJjZSBmb2xkZXIuXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIHRhcmdldCBmaWxlIG5hbWUuXG4gKiBAcGFyYW0ge09iamVjdH0gW2RhdGFdIC0gUGxhbmlmeSBwYXNzZWQgZGF0YS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGRvbmUgLSBQbGFuaWZ5ICdkb25lJyBjYWxsYmFjay5cbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvcHlGb2xkZXIoc3JjLCBuYW1lLCBkYXRhLCBkb25lKSB7XG4gICAgY29uc3Qgc3JjUGF0aCA9IHBhdGgucmVzb2x2ZShzcmMpO1xuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gdXRpbC5idWlsZFRlbXBGb2xkZXJOYW1lKG5hbWUpO1xuXG4gICAgaWYgKHNyY1BhdGggPT09IHByb2Nlc3MuY3dkKCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHBhdGg6IG11c3Qgbm90IGJlIGN1cnJlbnQgd29ya2luZyBkaXJlY3RvcnkhJyk7XG4gICAgfVxuXG4gICAgZnMuY29weShzcmNQYXRoLCBkZXN0aW5hdGlvbiwgKGVycikgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBmcy5yZW1vdmVTeW5jKHBhdGgucmVzb2x2ZShkZXN0aW5hdGlvbikpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoJ1xcblN1Y2Nlc3MhXFxuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBkb25lKGVycik7XG4gICAgfSk7XG59XG4iXX0=