const less = require('less');
const path = require('path');
const fs = require('fs');

class NodeModulesFileManager extends less.FileManager {

    static normalizeFilename (filename) {
        return filename.substring(1);
    }

    static isLessFile (filePath) {
        filePath = typeof filePath === 'string' ? filePath : path.format(filePath);
        if (fs.existsSync(filePath) === false) {
            return false;
        }

        return fs.statSync(filePath).isFile();
    }

    static isLessDirectory (filePath) {
        filePath = path.format(filePath);
        if (fs.existsSync(filePath) === false) {
            return false;
        }

        return fs.statSync(filePath).isDirectory();
    }

    constructor(options) {
        super();
        this.options = options;
    }

    supports (filename) {
        return filename.match(/^~.+/) !== null;
    }

    loadFile (filename) {
        let filenameNormalized = NodeModulesFileManager.normalizeFilename(filename);
        let filenameResolved = this.getResolvedImportPathsForFilename(filenameNormalized).reduce((filePathFound, filePath) => {
            if (filePathFound !== null) {
                return filePathFound;
            }

            if (NodeModulesFileManager.isLessFile(filePath)) {
                return path.format(filePath);
            }

            let directory = Object.assign(filePath, {ext: null, base: null});
            if (NodeModulesFileManager.isLessDirectory(directory)) {
                filePath = path.join(path.format(directory), this.options.mainFile);
                if (NodeModulesFileManager.isLessFile(filePath)) {
                    return filePath;
                }
            }
        }, null);

        if (typeof filenameResolved !== 'string') {
            return Promise.reject({message: `Could not import less file "${filename}", not resolvable`, type: 'File'});
        }

        return new Promise((resolve, reject) => {
            resolve({filename: filenameResolved, contents: fs.readFileSync(filenameResolved, {encoding: this.options.encoding})});
        });
    }

    getResolvedImportPathsForFilename (filename) {
        return this.options.importPaths.map(importPath => path.parse(path.resolve(path.join(importPath, filename))));
    }

}

module.exports = NodeModulesFileManager;