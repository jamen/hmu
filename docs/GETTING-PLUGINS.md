# Getting Plugins
In order to use hmu, you need plugins.  Plugins are what actually do a process whereas hmu acts as a shell for them to work beside each other.

You can find plugins to install via [searching for the keyword "hmu" on npm][npm-hmu] or see the [`awesome-hmu`][awesome-hmu] repository on GitHub.

Once you have found the plugin(s) you want to install, simply install them globally with npm:
```
$ npm install -g <...plugins>
```
Example:
```
$ npm install -g hmu-npm hmu-gh hmu-slack
```

From here, you can use them with `hmu`:
```
$ hmu npm foo bar, gh~slack foojs barjs
```
(See [USING-CLI](USING-CLI.md))

[npm-hmu]: https://www.npmjs.com/browse/keyword/hmu
[awesome-hmu]: https://github.com/jamen/awesome-hmu
