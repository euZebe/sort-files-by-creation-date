const { isDirectory, getFiles } = require('./utils');

// read argument
const directory = process.argv[2];

// console.log(`going to sort files into ${directory}`);

// check if path is a directory, else throws an exception
isDirectory(directory);

// list files to sort
const files = getFiles(directory);
console.log(`going to sort ${files.length} file(s) into ${directory}`);

// TODO: for each, get their creation date