const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');


module.exports.isDirectory = source => lstatSync(source).isDirectory();
const isFile = source => lstatSync(source).isFile();

module.exports.getFiles = source => readdirSync(source).map(name => join(source, name)).filter(isFile);

