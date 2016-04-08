# Writing Plugins
Plugins in hmu are simply Node modules that are installed globally...  Here you will learn how to write and structure them.

## Setting up your package
Keep in mind that **hmu plugins are Node packages**, so this means it should contain the same recipes any other Node package would have, like `package.json`, `README.md`, `LICENSE`, etc.

From here, there are a few extra good things we can do for our package:

 1. Add `"hmu": "*"` to `"peerDependencies"`.
 2. Add `"hmu"` into `"keywords"`.
 3. Add `"preferGlobal": true`.
 4. Install `hmu-plugin` (`npm install --save hmu-plugin`).
 5. Make sure the `"name"` is prefixed with `hmu-` (i.e. `hmu-npm`, `hmu-gh`)<sup>1</sup>

<sup>1</sup>: Can be overridden with `@`.  For instance, `$ hmu @foo` will search for `foo` instead of `hmu-foo`.

## Designing the module
The first step in creating the plugin is to initialize `hmu-plugin`:
```javascript
const util = require('hmu-plugin')(name);
```
Where `name` is the name of your plugin.

From here, [you can use any of `util`'s methods](https://), this normalizes output so your plugin looks nice.

### The plugin
The actual plugin of a hmu package is simply a function that returns a `Promise`.  This function provides `args` and `opts` that are passed down from the hmu execution...

So, the basic plugin structure would be:
```javascript
// Replace any occurence of 'foobar' with the name of the plugin.

const util = require('hmu-plugin')('foobar');

module.exports = function foobar(args, opts) {
  return new Promise(resolve => {
    // ...
  });
};
```

In the plugin function, `args` would be the arguments, where `opts` would be the flags...  For example:
```
$ hmu foo 1 2 bar --qux
```
```
args: 1, 2, bar
opts: --qux
```
(Arguments and options are parsed with [`minimist`](https://github.com/substack/minimist)).
