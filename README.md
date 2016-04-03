# hmu (hit me up)
> Plugin-based information fetching tool.

Hmu (hit me up) is an abstract _plugin-based_ information tool.  It is used for fetching various pieces of information through plugins made by the community, while keeping a clean and normalized output, so you can use plugins together at the same time.

In order to use hmu, [you need to get plugins][plugins].

Example plugins:
 - [`hmu-npm`][hmu-npm]: Check npm package name availability
 - [`hmu-gh`][hmu-gh]: Check GitHub user/organization name availability.
 - [`hmu-http`][hmu-http]: Check an HTTP server's status with GET requests.

See [`awesome-hmu`][awesome-hmu] for a list of curated plugins and utilities.

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
  [plugins]: https://www.npmjs.com/browse/keyword/hmu
  [hmu-npm]: https://github.com/devjs/hmu-npm
  [hmu-gh]: https://github.com/jamen/hmu-gh
  [hmu-http]: https://github.com/jamen/hmu-http
  [awesome-hmu]: https://github.com/jamen/awesome-hmu
