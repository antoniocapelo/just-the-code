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
            throw new Error(err);
        }

        process.stdout.write('\nSuccess!\n');
        done();
    });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb3B5LmpzIl0sIm5hbWVzIjpbImNvcHlGb2xkZXIiLCJ1dGlsIiwicmVxdWlyZSIsInBhdGgiLCJmcyIsInNyYyIsIm5hbWUiLCJkYXRhIiwiZG9uZSIsInNyY1BhdGgiLCJyZXNvbHZlIiwiZGVzdGluYXRpb24iLCJidWlsZFRlbXBGb2xkZXJOYW1lIiwicHJvY2VzcyIsImN3ZCIsIkVycm9yIiwiY29weSIsImVyciIsInN0ZG91dCIsIndyaXRlIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFhd0JBLFU7QUFieEIsSUFBTUMsT0FBT0MsUUFBUSxRQUFSLENBQWI7QUFDQSxJQUFNQyxPQUFPRCxRQUFRLE1BQVIsQ0FBYjtBQUNBLElBQU1FLEtBQUtGLFFBQVEsVUFBUixDQUFYOztBQUVBOzs7Ozs7Ozs7QUFTZSxTQUFTRixVQUFULENBQW9CSyxHQUFwQixFQUF5QkMsSUFBekIsRUFBK0JDLElBQS9CLEVBQXFDQyxJQUFyQyxFQUEyQztBQUN0RCxRQUFNQyxVQUFVTixLQUFLTyxPQUFMLENBQWFMLEdBQWIsQ0FBaEI7QUFDQSxRQUFNTSxjQUFjVixLQUFLVyxtQkFBTCxDQUF5Qk4sSUFBekIsQ0FBcEI7O0FBRUEsUUFBSUcsWUFBWUksUUFBUUMsR0FBUixFQUFoQixFQUErQjtBQUMzQixjQUFNLElBQUlDLEtBQUosQ0FBVSxzREFBVixDQUFOO0FBQ0g7O0FBRURYLE9BQUdZLElBQUgsQ0FBUVAsT0FBUixFQUFpQkUsV0FBakIsRUFBOEIsVUFBQ00sR0FBRCxFQUFTO0FBQ25DLFlBQUlBLEdBQUosRUFBUztBQUNMLGtCQUFNLElBQUlGLEtBQUosQ0FBVUUsR0FBVixDQUFOO0FBQ0g7O0FBRURKLGdCQUFRSyxNQUFSLENBQWVDLEtBQWYsQ0FBcUIsY0FBckI7QUFDQVg7QUFDSCxLQVBEO0FBUUgiLCJmaWxlIjoiY29weS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzLWV4dHJhJyk7XG5cbi8qKlxuICogQ29waWVzIHNvdXJjZSBmb2xkZXIgaW50byB0ZW1wb3JhcnkuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHNyYyAtIHNvdXJjZSBmb2xkZXIuXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIHRhcmdldCBmaWxlIG5hbWUuXG4gKiBAcGFyYW0ge09iamVjdH0gW2RhdGFdIC0gUGxhbmlmeSBwYXNzZWQgZGF0YS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGRvbmUgLSBQbGFuaWZ5ICdkb25lJyBjYWxsYmFjay5cbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvcHlGb2xkZXIoc3JjLCBuYW1lLCBkYXRhLCBkb25lKSB7XG4gICAgY29uc3Qgc3JjUGF0aCA9IHBhdGgucmVzb2x2ZShzcmMpO1xuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gdXRpbC5idWlsZFRlbXBGb2xkZXJOYW1lKG5hbWUpO1xuXG4gICAgaWYgKHNyY1BhdGggPT09IHByb2Nlc3MuY3dkKCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHBhdGg6IG11c3Qgbm90IGJlIGN1cnJlbnQgd29ya2luZyBkaXJlY3RvcnkhJyk7XG4gICAgfVxuXG4gICAgZnMuY29weShzcmNQYXRoLCBkZXN0aW5hdGlvbiwgKGVycikgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKCdcXG5TdWNjZXNzIVxcbicpO1xuICAgICAgICBkb25lKCk7XG4gICAgfSk7XG59XG4iXX0=