const csv=require('csvtojson');

const csvFilePath = './task2/csv/example.csv'
const fs = require('fs')
const readStream = fs.createReadStream(csvFilePath);

const writeStream = fs.createWriteStream('./task2/fromCSV.txt', 'utf8');

readStream.pipe(csv()).pipe(writeStream);