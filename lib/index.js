const each = require('async-each');
const resolve = require('./resolve');

module.exports = function hmu(plugins, dirs) {
  return new Promise((finish, reject) => {
    each(plugins, plugin => {
      resolve(plugin.name, dirs).then(
        entry => require(entry)(plugin.args),
        err => reject(err)
      ).catch(err => console.error(err.stack));
    }, finish);
  });
};
