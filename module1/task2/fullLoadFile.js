const csvFilePath = './csv/example.csv'
const csv = require('csvtojson')

const getJson = async () => {
	return csv().fromFile(csvFilePath);
}

// return with full load in RAM
// getJson().then(res => console.log(res))


