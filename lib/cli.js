#!/usr/bin/env node
const hmu = require('.');
const minimist = require('minimist');
const list = require('cli-list');
const path = require('path');

// Create CLI
const args = process.argv.slice(2);
const opts = { boolean: false };
const cli = list(args).map(set => minimist(set, opts));
const gbl = cli[0];

// Convert to `hmu` input
const plugins = cli.map(set => ({ name: set._[0], args: set._.slice(1), opts: set }));

// Run
hmu(plugins, gbl.dirs && gbl.dirs.split(path.delimeter)).then(() => {
  console.log('\n');
}, err => {
  console.error(gbl.verbose ? err.stack : err.message);
});
