#!/usr/bin/env node
'use strict';

const hmu = require('.');
const minimist = require('minimist');
const list = require('cli-list');
const path = require('path');
const sate = require('sate');

// Create CLI
const args = process.argv.slice(2);
const opts = { boolean: false };
const cli = list(args).map(set => minimist(set, opts));
const gbl = cli[0];

if (!args.length) {
  console.error('Usage: hmu <plugin> [...arguments], ...');
  process.exit(0);
}

let plugins = cli;

// Convert to `hmu` input
plugins = plugins.map(set => ({ name: set._[0], args: set._.slice(1), opts: set }));

// Convert joined plugins into separate ones
plugins = sate(plugins, function* expand(plugin) {
  const names = plugin.name.split('~');
  yield* names.map(name => Object.assign({}, plugin, { name }));
});

// Run
hmu(plugins, gbl.dirs && gbl.dirs.split(path.delimeter))
.catch(err => {
  console.error(gbl.verbose ? err.stack : err.message);
});
