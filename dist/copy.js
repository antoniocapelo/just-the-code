'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = copyFolder;
var util = require('./util');
var path = require('path');
var fs = require('fs-extra');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb3B5LmpzIl0sIm5hbWVzIjpbImNvcHlGb2xkZXIiLCJ1dGlsIiwicmVxdWlyZSIsInBhdGgiLCJmcyIsInNyYyIsIm5hbWUiLCJkYXRhIiwiZG9uZSIsInNyY1BhdGgiLCJyZXNvbHZlIiwiZGVzdGluYXRpb24iLCJidWlsZFRlbXBGb2xkZXJOYW1lIiwicHJvY2VzcyIsImN3ZCIsIkVycm9yIiwiY29weSIsImVyciIsInN0ZG91dCIsIndyaXRlIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFJd0JBLFU7QUFKeEIsSUFBTUMsT0FBT0MsUUFBUSxRQUFSLENBQWI7QUFDQSxJQUFNQyxPQUFPRCxRQUFRLE1BQVIsQ0FBYjtBQUNBLElBQU1FLEtBQUtGLFFBQVEsVUFBUixDQUFYOztBQUVlLFNBQVNGLFVBQVQsQ0FBb0JLLEdBQXBCLEVBQXlCQyxJQUF6QixFQUErQkMsSUFBL0IsRUFBcUNDLElBQXJDLEVBQTJDO0FBQ3RELFFBQU1DLFVBQVVOLEtBQUtPLE9BQUwsQ0FBYUwsR0FBYixDQUFoQjtBQUNBLFFBQU1NLGNBQWNWLEtBQUtXLG1CQUFMLENBQXlCTixJQUF6QixDQUFwQjs7QUFFQSxRQUFJRyxZQUFZSSxRQUFRQyxHQUFSLEVBQWhCLEVBQStCO0FBQzNCLGNBQU0sSUFBSUMsS0FBSixDQUFVLHNEQUFWLENBQU47QUFDSDs7QUFFRFgsT0FBR1ksSUFBSCxDQUFRUCxPQUFSLEVBQWlCRSxXQUFqQixFQUE4QixVQUFDTSxHQUFELEVBQVM7QUFDbkMsWUFBSUEsR0FBSixFQUFTO0FBQ0wsa0JBQU0sSUFBSUYsS0FBSixDQUFVRSxHQUFWLENBQU47QUFDSDs7QUFFREosZ0JBQVFLLE1BQVIsQ0FBZUMsS0FBZixDQUFxQixjQUFyQjtBQUNBWDtBQUNILEtBUEQ7QUFRSCIsImZpbGUiOiJjb3B5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMtZXh0cmEnKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29weUZvbGRlcihzcmMsIG5hbWUsIGRhdGEsIGRvbmUpIHtcbiAgICBjb25zdCBzcmNQYXRoID0gcGF0aC5yZXNvbHZlKHNyYyk7XG4gICAgY29uc3QgZGVzdGluYXRpb24gPSB1dGlsLmJ1aWxkVGVtcEZvbGRlck5hbWUobmFtZSk7XG5cbiAgICBpZiAoc3JjUGF0aCA9PT0gcHJvY2Vzcy5jd2QoKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgcGF0aDogbXVzdCBub3QgYmUgY3VycmVudCB3b3JraW5nIGRpcmVjdG9yeSEnKTtcbiAgICB9XG5cbiAgICBmcy5jb3B5KHNyY1BhdGgsIGRlc3RpbmF0aW9uLCAoZXJyKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoJ1xcblN1Y2Nlc3MhXFxuJyk7XG4gICAgICAgIGRvbmUoKTtcbiAgICB9KTtcbn1cbiJdfQ==