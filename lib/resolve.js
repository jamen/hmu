var each = require('async-each');
const fullpath = require('resolve');
const path = require('path');

module.exports = function resolve(name, defaultDirs) {
  return new Promise((finish, nope) => {
    const packageName = (
      name[0] === '@' ?
      name.slice(1) :
      `hmu-${name}`
    );

    // Collect various directories to search.
    let dirs = defaultDirs || [];
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
    each(dirs, (dir, next) => {
      fullpath(packageName, {basedir: dir}, (err, file) => {
        next(null, !err && file ? file : null);
      });
    }, (err, res) => {
      const files = res.filter(a => a);
      if (!err && files.length) {
        finish(files[0]);
      } else {
        nope(new Error(`Could not find plugin ${name}`));
      }
    });
  });
};
