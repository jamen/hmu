#!/usr/bin/env node
require('any-promise/register/bluebird');
var hmu = require('hmu-core');
var list = require('cli-list');
var minimist = require('minimist');
var resolve = require('./resolve');
var each = require('async-each');
var chalk = require('chalk');

var opts = minimist(process.argv.slice(2));
var argv = opts._;

if (argv.length) {
  var pluginFail = function pluginFail(err) {
    console.error(err.message);
  };

  var highlight = function highlight(item) {
    return item.map(function(child) {
      return child.map(function(text, i) {
        if (!i) {
          return chalk.blue(text);
        }

        if (text === 'taken') {
          return chalk.red(text);
        }

        if (text === 'free') {
          return chalk.green(text);
        }

        return text;
      }).join(' ');
    });
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
    hmu(runs, highlight).then(function(outputs) {
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
} else if (opts.help) {
  console.log(
    'Usage:\n\n' +
    '  hmu <plugin [...args], ...>\n'
  );

  console.log(
    'Special Usage: \n\n' +
    '  1. Use "," to separate multiple plugin runs.  For example,\n' +
    '     "hmu npm foo, gh bar"\n' +
    '  2. Use "~" to spread the input, like "hmu npm~gh foo bar".\n' +
    '     This is equivalent to "hmu npm foo bar, gh foo bar".\n' +
    '  3. Prefix with "@" to use plugins not prefixed with "hmu-".'
  );
} else if (opts.resolve) {
  resolve(opts.resolve).then(function(file) {
    console.log(file);
    process.exit(0);
  }, console.error);
} else {
  console.log('Usage:\n');
  console.log('  hmu <plugin [...args], ...>\n');
  console.log('Type "hmu --help" for more info.');
}
