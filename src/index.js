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

}

module.exports = LessPluginNodeModulesImport;