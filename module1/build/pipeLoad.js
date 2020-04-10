"use strict";

var csv = require('csvtojson');

var csvFilePath = './task2/csv/example.csv';

var fs = require('fs');

var readStream = fs.createReadStream(csvFilePath);
var writeStream = fs.createWriteStream('./task2/fromCSV.txt', 'utf8');
readStream.pipe(csv()).pipe(writeStream);
