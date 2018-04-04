const { DateTime } = require('luxon');
const { basename } = require('path');

const {
  isDirectory,
  getFiles,
  getFileCreationDate,
  isWeekend,
  isWorkDayEvening,
  moveFileTo,
  createDirIfNeeded,
  WEEKEND_FOLDER,
  EVENING_FOLDER,
  WORK_FOLDER,
} = require('./utils');

const startDate = DateTime.local();

// read argument
const directory = process.argv[2];

// console.log(`going to sort files into ${directory}`);

// check if path is a directory, else throws an exception
isDirectory(directory);

// list files to sort
const files = getFiles(directory);
console.log(`${files.length} fichier(s) à trier dans ${directory}`);

files.map(f => {
  // for each, get their creation date
  const creationDate = getFileCreationDate(f);

  // TODO: deal with timezones

  // determine if date is a weekend
  if (isWeekend(creationDate)) {
    // TODO move to ${directory}/_weekend
    createDirIfNeeded(directory, WEEKEND_FOLDER);
    moveFileTo(f, directory, WEEKEND_FOLDER);
    console.log(basename(f), 'créé un', creationDate.get('weekdayLong'), `déplacé dans ${WEEKEND_FOLDER}`);

  } else if (isWorkDayEvening(creationDate)) {
    // TODO move to ${directory}/_evening_of_working_days
    createDirIfNeeded(directory, EVENING_FOLDER);
    moveFileTo(f, directory, EVENING_FOLDER);
    console.log(basename(f), 'créé à', `${creationDate.get('hour')}:${creationDate.get('minute')}`, `déplacé dans ${EVENING_FOLDER}`);
  } else {
    // TODO move to ${directory}/_working_hours
    createDirIfNeeded(directory, WORK_FOLDER);
    moveFileTo(f, directory, WORK_FOLDER);
    console.log(basename(f), 'créé un', `${creationDate.get('weekdayLong')} à ${creationDate.get('hour')}:${creationDate.get('minute')}`, `déplacé dans ${WORK_FOLDER}`);
  }
});

const endDate = DateTime.local();
console.log('tâche terminée en ', endDate.diff(startDate).milliseconds / 1000, 'secondes.');
