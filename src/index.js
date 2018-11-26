const NodeModulesFileManager = require('./NodeModulesFileManager');

class LessPluginNodeModulesImport {

    constructor(options = {}) {
        this.options = Object.assign({}, {
            importPaths: require.main.paths,
            mainFile: 'index.less',
            encoding: 'utf-8'
        }, options);
    }

    install (lessInstance, pluginManager) {
        pluginManager.addFileManager(new NodeModulesFileManager(this.options));
    }

    setOptions (options) {
        let optionsObject;
        try {
            optionsObject = JSON.parse(options);
        } catch (e) {
            throw new Error(`Passed options for less-plugin-nodemodules-import are no valid JSON`);
        }

        this.options = Object.assign({}, this.options, optionsObject);
    }

}

module.exports = LessPluginNodeModulesImport;