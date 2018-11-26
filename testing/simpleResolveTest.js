const less = require('less');
const fs = require('fs');
const LessPluginNodeModulesImport = require('../src');

let lessContents = fs.readFileSync('./src/anyLessFile.less', {encoding: 'utf-8'});
less.render(lessContents, {plugins: [new LessPluginNodeModulesImport({importPaths: ['./externals']})]}).then(lessRendered => console.log(lessRendered.css));