#!/usr/bin/env node

require('babel-polyfill');

const yargs = require('yargs');
const planify = require('planify');

const remove = require('./remove');
const compress = require('./compress');
const copy = require('./copy');

// ---------------------------------------------------------
// CLI definition
// ---------------------------------------------------------

const argv = yargs
.strict()
.wrap(Math.min(120, yargs.terminalWidth()))
.help('help').alias('help', 'h')
.usage('Usage: ./$0 path-to-compress [options]')
.option('name', {
    alias: 'n',
    type: 'string',
    default: 'archive',
})
.option('git', {
    alias: 'g',
    type: 'boolean',
    default: false,
})
.demandCommand(1, 'Please provide the directory you which to compress.')
.argv;


// ---------------------------------------------------------
// Steps
// ---------------------------------------------------------

planify({ exit: true, reporter: argv.reporter })
.step('Cleaning previous zip file', remove.previousBuild.bind(null, (argv.name)))
.step('Copying folder to temp folder', copy.default.bind(null, argv._[0], argv.name))
.step('Removing dependency folders', remove.unnecessary.bind(null, argv.name, argv.git))
.step('Compressing copied folder', compress.default.bind(null, argv.name))
.step('Removing the temporary folder', remove.temporary.bind(null, argv.name))
.run();

