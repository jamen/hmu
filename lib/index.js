const each = require('async-each');
const resolve = require('./resolve');
const Circuit = require('promise-circuit');

module.exports = function hmu(plugins, dirs) {
  return new Promise(finish => {
    const proc = new Circuit();

    each(plugins, (plugin, next) => {
      resolve(plugin.name, dirs).then(entry => {
        proc.add(require(entry), [plugin.args, plugin.opts]);
        next();
      });
    }, () => {
      proc.run().then(finish);
    });
  });
};
