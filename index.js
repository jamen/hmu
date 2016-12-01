#!/usr/bin/env node

var hmu = require('hmu-core')
var requireg = require('requireg')
var minimist = require('minimist')
var list = require('cli-list')
var chalk = require('chalk')

var lists = list(process.argv.slice(2))
var requests = lists.reduce(function (requests, list) {
  var options = minimist(list)
  var input = options._
  var plugins = input.shift()

  if (plugins) {
    var _plugins = plugins.split('~')
    for (var i = 0, max = _plugins.length; i < max; i++) {
      // Get and resolve name
      var name = _plugins[i], plugin
      if (name[0] === '@') plugin = name.slice(1)
      else plugin = 'hmu-' + name

      // Require globally installed plugin
      var target = requireg(plugin)

      console.log(target, plugin)

      // Push request
      requests.push({ target, input, options, name })
    }
  }

  return requests
}, [])

hmu(requests, function (err, res) {
  if (err) throw err
  res.forEach(function (result, i) {
    result.forEach(function (data) {
      console.log(requests[i].name, data)
    })
  })
})
