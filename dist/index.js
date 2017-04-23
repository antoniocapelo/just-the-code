#!/usr/bin/env node
'use strict';

require('babel-polyfill');

var yargs = require('yargs');
var planify = require('planify');

var remove = require('./remove');
var compress = require('./compress');
var copy = require('./copy');

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
// Steps
// ---------------------------------------------------------

planify({ exit: true, reporter: argv.reporter }).step('Cleaning previous zip file', remove.previousBuild.bind(null, argv.name)).step('Copying folder to temp folder', copy.default.bind(null, argv._[0], argv.name)).step('Removing dependency folders', remove.unnecessary.bind(null, argv.name, argv.git)).step('Compressing copied folder', compress.default.bind(null, argv.name)).step('Removing the temporary folder', remove.temporary.bind(null, argv.name)).run();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwieWFyZ3MiLCJwbGFuaWZ5IiwicmVtb3ZlIiwiY29tcHJlc3MiLCJjb3B5IiwiYXJndiIsInN0cmljdCIsIndyYXAiLCJNYXRoIiwibWluIiwidGVybWluYWxXaWR0aCIsImhlbHAiLCJhbGlhcyIsInVzYWdlIiwib3B0aW9uIiwidHlwZSIsImRlZmF1bHQiLCJkZW1hbmRDb21tYW5kIiwiZXhpdCIsInJlcG9ydGVyIiwic3RlcCIsInByZXZpb3VzQnVpbGQiLCJiaW5kIiwibmFtZSIsIl8iLCJ1bm5lY2Vzc2FyeSIsImdpdCIsInRlbXBvcmFyeSIsInJ1biJdLCJtYXBwaW5ncyI6Ijs7QUFFQUEsUUFBUSxnQkFBUjs7QUFFQSxJQUFNQyxRQUFRRCxRQUFRLE9BQVIsQ0FBZDtBQUNBLElBQU1FLFVBQVVGLFFBQVEsU0FBUixDQUFoQjs7QUFFQSxJQUFNRyxTQUFTSCxRQUFRLFVBQVIsQ0FBZjtBQUNBLElBQU1JLFdBQVdKLFFBQVEsWUFBUixDQUFqQjtBQUNBLElBQU1LLE9BQU9MLFFBQVEsUUFBUixDQUFiOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNTSxPQUFPTCxNQUNaTSxNQURZLEdBRVpDLElBRlksQ0FFUEMsS0FBS0MsR0FBTCxDQUFTLEdBQVQsRUFBY1QsTUFBTVUsYUFBTixFQUFkLENBRk8sRUFHWkMsSUFIWSxDQUdQLE1BSE8sRUFHQ0MsS0FIRCxDQUdPLE1BSFAsRUFHZSxHQUhmLEVBSVpDLEtBSlksQ0FJTix3Q0FKTSxFQUtaQyxNQUxZLENBS0wsTUFMSyxFQUtHO0FBQ1pGLFdBQU8sR0FESztBQUVaRyxVQUFNLFFBRk07QUFHWkMsYUFBUztBQUhHLENBTEgsRUFVWkYsTUFWWSxDQVVMLEtBVkssRUFVRTtBQUNYRixXQUFPLEdBREk7QUFFWEcsVUFBTSxTQUZLO0FBR1hDLGFBQVM7QUFIRSxDQVZGLEVBZVpDLGFBZlksQ0FlRSxDQWZGLEVBZUsscURBZkwsRUFnQlpaLElBaEJEOztBQW1CQTtBQUNBO0FBQ0E7O0FBRUFKLFFBQVEsRUFBRWlCLE1BQU0sSUFBUixFQUFjQyxVQUFVZCxLQUFLYyxRQUE3QixFQUFSLEVBQ0NDLElBREQsQ0FDTSw0QkFETixFQUNvQ2xCLE9BQU9tQixhQUFQLENBQXFCQyxJQUFyQixDQUEwQixJQUExQixFQUFpQ2pCLEtBQUtrQixJQUF0QyxDQURwQyxFQUVDSCxJQUZELENBRU0sK0JBRk4sRUFFdUNoQixLQUFLWSxPQUFMLENBQWFNLElBQWIsQ0FBa0IsSUFBbEIsRUFBd0JqQixLQUFLbUIsQ0FBTCxDQUFPLENBQVAsQ0FBeEIsRUFBbUNuQixLQUFLa0IsSUFBeEMsQ0FGdkMsRUFHQ0gsSUFIRCxDQUdNLDZCQUhOLEVBR3FDbEIsT0FBT3VCLFdBQVAsQ0FBbUJILElBQW5CLENBQXdCLElBQXhCLEVBQThCakIsS0FBS2tCLElBQW5DLEVBQXlDbEIsS0FBS3FCLEdBQTlDLENBSHJDLEVBSUNOLElBSkQsQ0FJTSwyQkFKTixFQUltQ2pCLFNBQVNhLE9BQVQsQ0FBaUJNLElBQWpCLENBQXNCLElBQXRCLEVBQTRCakIsS0FBS2tCLElBQWpDLENBSm5DLEVBS0NILElBTEQsQ0FLTSwrQkFMTixFQUt1Q2xCLE9BQU95QixTQUFQLENBQWlCTCxJQUFqQixDQUFzQixJQUF0QixFQUE0QmpCLEtBQUtrQixJQUFqQyxDQUx2QyxFQU1DSyxHQU5EIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbnJlcXVpcmUoJ2JhYmVsLXBvbHlmaWxsJyk7XG5cbmNvbnN0IHlhcmdzID0gcmVxdWlyZSgneWFyZ3MnKTtcbmNvbnN0IHBsYW5pZnkgPSByZXF1aXJlKCdwbGFuaWZ5Jyk7XG5cbmNvbnN0IHJlbW92ZSA9IHJlcXVpcmUoJy4vcmVtb3ZlJyk7XG5jb25zdCBjb21wcmVzcyA9IHJlcXVpcmUoJy4vY29tcHJlc3MnKTtcbmNvbnN0IGNvcHkgPSByZXF1aXJlKCcuL2NvcHknKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBDTEkgZGVmaW5pdGlvblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmNvbnN0IGFyZ3YgPSB5YXJnc1xuLnN0cmljdCgpXG4ud3JhcChNYXRoLm1pbigxMjAsIHlhcmdzLnRlcm1pbmFsV2lkdGgoKSkpXG4uaGVscCgnaGVscCcpLmFsaWFzKCdoZWxwJywgJ2gnKVxuLnVzYWdlKCdVc2FnZTogLi8kMCBwYXRoLXRvLWNvbXByZXNzIFtvcHRpb25zXScpXG4ub3B0aW9uKCduYW1lJywge1xuICAgIGFsaWFzOiAnbicsXG4gICAgdHlwZTogJ3N0cmluZycsXG4gICAgZGVmYXVsdDogJ2FyY2hpdmUnLFxufSlcbi5vcHRpb24oJ2dpdCcsIHtcbiAgICBhbGlhczogJ2cnLFxuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBkZWZhdWx0OiBmYWxzZSxcbn0pXG4uZGVtYW5kQ29tbWFuZCgxLCAnUGxlYXNlIHByb3ZpZGUgdGhlIGRpcmVjdG9yeSB5b3Ugd2hpY2ggdG8gY29tcHJlc3MuJylcbi5hcmd2O1xuXG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gU3RlcHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5wbGFuaWZ5KHsgZXhpdDogdHJ1ZSwgcmVwb3J0ZXI6IGFyZ3YucmVwb3J0ZXIgfSlcbi5zdGVwKCdDbGVhbmluZyBwcmV2aW91cyB6aXAgZmlsZScsIHJlbW92ZS5wcmV2aW91c0J1aWxkLmJpbmQobnVsbCwgKGFyZ3YubmFtZSkpKVxuLnN0ZXAoJ0NvcHlpbmcgZm9sZGVyIHRvIHRlbXAgZm9sZGVyJywgY29weS5kZWZhdWx0LmJpbmQobnVsbCwgYXJndi5fWzBdLCBhcmd2Lm5hbWUpKVxuLnN0ZXAoJ1JlbW92aW5nIGRlcGVuZGVuY3kgZm9sZGVycycsIHJlbW92ZS51bm5lY2Vzc2FyeS5iaW5kKG51bGwsIGFyZ3YubmFtZSwgYXJndi5naXQpKVxuLnN0ZXAoJ0NvbXByZXNzaW5nIGNvcGllZCBmb2xkZXInLCBjb21wcmVzcy5kZWZhdWx0LmJpbmQobnVsbCwgYXJndi5uYW1lKSlcbi5zdGVwKCdSZW1vdmluZyB0aGUgdGVtcG9yYXJ5IGZvbGRlcicsIHJlbW92ZS50ZW1wb3JhcnkuYmluZChudWxsLCBhcmd2Lm5hbWUpKVxuLnJ1bigpO1xuXG4iXX0=