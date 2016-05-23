# Hit Me Up
> Fetch name availability, server statuses, tweets, and lots of other information through plugins.

Hit Me Up is a tool for fetching all sorts of information through plugins hosted on npm.  Information can include things like name availability on services (like GitHub and Slack), checking server statuses, fetching tweets, and many other possibilities.

[<img src="https://asciinema.org/a/46407.png" height="250" alt="Screencast Demo">](https://asciinema.org/a/46407)

## Getting Started
First, you want to install the hmu CLI globally from npm:
```shell
$ npm install --global hmu
```

#### Installing Plugins
You can also install plugins globally with npm:
```shell
$ npm install --global hmu-npm hmu-gh hmu-slack
```
(This will install [hmu-gh], [hmu-npm], and [hmu-slack] to start you off)

You can find plugins from [npm's `hmu-plugin` keyword index][npm-hmu-plugin] and install them globally too.

#### Running Plugins
Plugins can be ran very simply through the `hmu` CLI.  You specify the plugin name, and then input and options after it...  For example:
```shell
$ hmu npm foo bar --qux
```
In this example, `npm` is the plugin, `foo` and `bar` are the input, and `qux` is an option.

The basic usage follows:
```
$ hmu <name> [...args]
```

Now, onto slightly more advanced usage, you can run multiple plugins at once by separating them with a comma (`,`):
```shell
$ hmu npm foo, gh bar
```
In this example, we have the plugins `npm` and `gh`, and their inputs `foo` and `bar` respectively.

You can also "spread" one input between multiple plugins by separating the names with a tilde (`~`) like so:
```shell
$ hmu npm~gh foo bar
```
This is equivalent to doing:
```
$ hmu npm foo bar, gh foo bar
```

Plugins that are named unconventionally and don't start with `hmu-` can be ran if you start the name with the at symbol (`@`):
```
$ npm install --global some-plugin
# ...
$ hmu @some-plugin foo bar
```

#### Also See
 - [hmu-core][hmu-core]: The core that the CLI is based on top of.  All plugins are compatible with the core.
 - [Writing a Hit Me Up plugin][write-hmu-plugin].

## Credits
| ![jamen][avatar] |
|:---:|
| [Jamen Marzonie][github] |

## License
[MIT](LICENSE) &copy; Jamen Marzonie

[avatar]: https://avatars.githubusercontent.com/u/6251703?v=3&s=125
[github]: https://github.com/jamen
[write-hmu-plugin]: https://gist.github.com/jamen/ed0c1cd85bc1908e94b838cf7b35874d
[hmu-core]: https://github.com/jamen/hmu-core
[hmu-gh]: https://npmjs.com/hmu-gh
[hmu-npm]: https://npmjs.com/hmu-npm
[hmu-slack]: https://npmjs.com/hmu-slack
[npm-hmu-plugin]: https://www.npmjs.com/browse/keyword/hmu-plugin
