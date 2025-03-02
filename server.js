const express = require('express');
const server = express();
const cron = require('node-cron');
require('dotenv').config();
const { default: axios } = require('axios');
const { checkSessionExpiration } = require('./helper/checkSessionExpiration');
const { sendRankingResult } = require('./helper/sendRankingResult');
const { getExamSchedule } = require('./helper/initiateQuiz');
const { getDaily6AMCron, getWeekly10AMCron } = require('./helper/convertExamSchedule');
const config = require('./config/config');
const PORT = config.port;

/**
 * Starts an HTTP server and schedules cron tasks for periodic GET requests to an API endpoint.
 * The server listens on a specified port and sends initial and scheduled GET requests.
 *
 * @param {number} PORT - The port on which the HTTP server should listen.
 */
server.listen(PORT, async () => {
	await getExamSchedule();

	const daily6AMCron = getDaily6AMCron();
	const weekly10AMCron = getWeekly10AMCron();

	cron.schedule(daily6AMCron, async () => {
		await getExamSchedule();
	});

	cron.schedule('*/20 * * * * *', async () => {
		await checkSessionExpiration();
	});

	cron.schedule(weekly10AMCron, async () => {
		await sendRankingResult();
	});

	console.log(`listening on port ${PORT}`);
});
