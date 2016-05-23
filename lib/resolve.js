var each = require('async-each');
var fullpath = require('resolve');
var path = require('path');

module.exports = function resolve(name, defaultDirs) {
  return new Promise(function(finish, nope) {
    var packageName = (
      name[0] === '@' ?
      name.slice(1) :
      'hmu-' + name
    );

    // Collect various directories to search.
    var dirs = defaultDirs || [];
    if (process.env.NODE_PATH) {
      dirs = dirs.concat(process.env.NODE_PATH.split(path.delimeter));
    } else {
      dirs.push(path.join(__dirname, '../..'));
      if (process.platform === 'win32') {
        dirs.push(path.join(process.env.APPDATA, 'npm/node_modules'));
      } else {
        dirs.push('/usr/lib/node_modules');
      }
    }

    // Iterate dirs and check if plugin is there.
    each(dirs, function(dir, next) {
      fullpath(packageName, {basedir: dir}, function(err, file) {
        next(null, !err && file ? file : null);
      });
    }, function(err, res) {
      var files = res.filter(function(i) {
        return i;
      });
      if (!err && files.length) {
        finish(files[0]);
      } else {
        nope(new Error('Could not find plugin "' + name + '"'));
      }
    });
  });
};
