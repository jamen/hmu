const each = require('async-each');
const resolve = require('./resolve');

module.exports = function hmu(plugins) {
  return new Promise((finish, reject) => {
    each(plugins, plugin => {
      resolve(plugin.name).then(
        path => require(path[0])(plugin.args),
        () => reject(new Error(`Plugin "${plugin.name}" could not be found`))
      ).catch(err => console.error(err.stack));
    }, finish);
  });
};
