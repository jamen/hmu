'use strict';
/** Path Resolver
  * Resolves plugin names into full-path entry points.
  */

const fullpath = require('resolve');
const path = require('path');
const each = require('async-each');

module.exports = function resolve(name) {
  return new Promise((finish, nope) => {
    const packageName = (
      name[0] === '@'
      ? name.slice(1)
      : `hmu-${name}`
    );

    // Collect various directories to search.
    let dirs = [];
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

    console.log(dirs);

    // Iterate dirs and check if plugin is there.
    each(dirs, (dir, next) => {
      fullpath(packageName, { basedir: dir }, (err, file) => {
        if (!err && file) next(null, file);
      });
    }, (err, files) => {
      console.log(files)
      if (!err) finish(files);
      else nope(new Error(`Could not find plugin ${name}`));
    });
  });
};
