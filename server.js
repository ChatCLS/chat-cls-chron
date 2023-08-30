const cron = require('node-cron');
const express = require('express');
const server = express();

const { initiateQuiz } = require('./helper/initiateQuiz');
const { convertDate } = require('./helper/convertExamSchedule');
const { fetchLatestExamSchedules } = require('./helper/latestQuizSchedule');
require('dotenv').config();
const PORT = 8000;

// let examSchedules = [];

cron.schedule('13 13 * * *', async () => {
	let examSchedules = await fetchLatestExamSchedules();
	if (examSchedules.length > 0) {
		examSchedules.sort().forEach((element) => {
			console.log('🚀 ~ file: server.js:17 ~ examSchedules.forEach ~ element:', element);

			cron.schedule(convertDate(element), initiateQuiz);
		});
	}
});

server.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
