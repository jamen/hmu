# hmu (hit me up)
> Plugin-based information fetching tool.

Hmu is an abstract tool used for getting information using plugins.  From package availablity to server status, the only limit to hmu is what Node can do...  This is a plugin-based tool, and doesn't provide much right out of the box, so you need to [get plugins in order to use it.](https://www.npmjs.com/browse/keyword/hmu)

## Installation
```shell
$ npm install -g hmu
```

## Usage
```shell
$ hmu <plugin> [...arguments], [...]
```
Example:
```
$ hmu npm osia, gh osiajs
```
Separate multiple plugins with `,` (comma) using [`cli-list`](https://github.com/jamen/cli-list).

## Credits
| ![jamen][avatar] |
|:---:|
| [Jamen Marzonie][github] |

  [avatar]: https://avatars.githubusercontent.com/u/6251703?v=3&s=125
  [github]: https://github.com/jamen
