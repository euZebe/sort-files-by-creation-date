const { lstatSync, readdirSync, renameSync, mkdirSync } = require('fs');
const { join, basename } = require('path');
const { DateTime } = require('luxon');


module.exports.isDirectory = source => lstatSync(source).isDirectory();
const isFile = source => lstatSync(source).isFile();

module.exports.getFiles = source => readdirSync(source)
  .map(f => join(source, f))
  .filter(isFile);

module.exports.getFileCreationDate = source => DateTime.fromMillis(lstatSync(source).mtime);


module.exports.isWeekend = date => date.get('weekday') >= 6;
module.exports.isWorkDayEvening = date => date.get('weekday') < 6 && (
  date.get('hour') > 18 // UTC => 20h
  || date.get('hour') < 5  // UTC => 7h
);

module.exports.moveFileTo = (filePath, directory, subDirectory) => {
  const fileName = basename(filePath);
  renameSync(
    join(directory, fileName),
    join(directory, subDirectory, fileName)
  );
};

module.exports.createDirIfNeeded = (source, subDirectory) => {
  try {
    lstatSync(join(source, subDirectory));
  } catch (e) {
    mkdirSync(join(source, subDirectory));
  }
};

module.exports.WEEKEND_FOLDER = '_weekend';
module.exports.EVENING_FOLDER = '_evening_of_working_days';
module.exports.WORK_FOLDER = '_working_hours';