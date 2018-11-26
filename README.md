# less-plugin-nodemodules-import
This plugin provides less imports from `node_modules`, just like [less/less-plugin-npm-import](https://github.com/less/less-plugin-npm-import) and webpack's [less-loader](https://github.com/webpack-contrib/less-loader) do.

## Usage
Install with npm (or yarn):
```bash
$ npm install @thomann/less-plugin-nodemodules-import
```

### Programmatic Usage
Register with your less instance:
```js
const LessPluginNodeModulesImport = require('@thomann/less-plugin-nodemodules-import');
less.render(anyFile, {plugins: [new LessPluginNodeModulesImport(opts)]});
```

### Command-Line Usage
```bash
$ lessc --plugin=@thomann/less-plugin-nodemodules-import <less-file>
```
To define options with command line usage, pass a JSON object string with the parameters as [less plugin option](http://lesscss.org/usage/#plugins-using-the-command-line):
```bash
$ lessc --plugin=@thomann/less-plugin-nodemodules-import={"mainFile":"main.less"}
```
Note that the parameters have to be valid JSON.

## Options
|OptionKey|Value Type|Default|Description|
|-|-|-|-|
|`importPaths`|array|values from [require.module.paths](https://nodejs.org/api/modules.html#modules_module_paths)|The paths to find imports in|
|`mainFile`|string|index.less|Which file to load if the import is a directory|
|`encoding`|string|utf-8|Encoding for reading imported files|

Directories in `importPaths` have to be absolute or relative to the **executing file**. 