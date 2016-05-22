#!/usr/bin/env node
var hmu = require('hmu-core');
var list = require('cli-list');
var minimist = require('minimist');
var resolve = require('./resolve');
var each = require('async-each');

var opts = minimist(process.argv.slice(2));
var argv = opts._;

if (!argv.length) {
  if (opts.help) {
    console.log(
      'Usage:\n' +
      '  hmu <plugin [...args], ...>\n'
    );

    console.log(
      'Special Usage: \n' +
      '  1. Use "," to separate multiple plugin runs.  For example,\n' +
      '     "hmu npm foo, gh bar"\n\n' +
      '  2. Use "~" to spread the input, like "hmu npm~gh foo bar".\n' +
      '     This is equivalent to "hmu npm foo bar, gh foo bar".\n\n' +
      '  3. Prefix with "@" to use plugins not prefixed with "hmu-".'
    );
  } else {
    console.log('Usage:\n');
    console.log('  hmu <plugin [...args], ...>\n');
    console.log('Type "hmu --help" for more info.');
  }

  process.exit(0);
}

var pluginFail = function pluginFail() {
  console.error('Failed to get plugin "' + this + '"');
};

var runs = [];
each(list(argv), function map(item, next) {
  var names = item[0].split('~');
  var options = minimist(item.slice(1));
  var input = options._;
  each(names, function(name, subNext) {
    resolve(name).then(function resolve(path) {
      runs.push({
        plugin: require(path),
        input: input,
        options: options
      });
      subNext(null, null);
    }, pluginFail.bind(name));
  }, next);
}, function() {
  hmu(runs).then(function(outputs) {
    for (var i = 0, max = outputs.length; i < max; i++) {
      var output = outputs[i];
      if (output && output.constructor === Array) {
        console.log.apply(console, output);
      } else {
        console.log(output);
      }
    }
  });
});
