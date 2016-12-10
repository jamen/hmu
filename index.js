#!/usr/bin/env node

var hmu = require('hmu-core')
var requireg = require('requireg')
var minimist = require('minimist')
var list = require('cli-list')
var chalk = require('chalk')

// Parse argument lists into array of requests
var lists = list(process.argv.slice(2))
var requests = lists.reduce(function (requests, list) {
  var options = minimist(list)
  var input = options._
  var plugins = input.shift()
  if (plugins) {
    plugins.split('~').forEach(function (name) {
      // Resolve plugin name
      var plugin = name[0] === '@' ? name.slice(1) : 'hmu-' + name
      // Require globally installed plugin
      var target = requireg(plugin)
      // Push request
      requests.push({ target, input, options, name })
    })
  }
  return requests
}, [])

// Run requests with hmu-core
hmu(requests, function (err, res) {
  if (err) throw err
  res.forEach(function (result, i) {
    result.forEach(function (data) {
      if (data) console.log(chalk.blue(requests[i].name), data)
    })
  })
})
