# Using `hmu`
In order to use `hmu`, you need to first install it, do so by installing globally with npm... Like so:
```
$ npm install -g hmu
```

From here, the basic usage follows:
```
$ hmu <plugin> [...arguments], ...
```
For example:
```
$ hmu gh foo bar
```
Where `gh` is the _plugin_ then `foo` and `bar` are the _arguments_.

(See [GETTING-PLUGINS](GETTING-PLUGINS.md) for more information on installing hmu plugins.)

## Run multiple plugins
You can use the `,` (comma) to delimit multiple plugins:
```
hmu npm foo, gh bar
```
Where `npm` and `gh` are the _plugins_, then `foo` and `bar` are the _arguments_ respectively.

## Input spread
You can also feed the same set of arguments to multiple plugins with `~` (tilde):
```
$ hmu npm~gh~slack foobar
```
This is equivalent to doing:
```
$ hmu npm foobar, gh foobar, slack foobar
```

## Unconventionally named plugins
You can use unconventionally named plugins (not prefixed with `hmu-`) by using `@`:
```
$ hmu @some-plugin foo bar
```
Where hmu would look for `some-plugin` instead of `hmu-some-plugin`.
