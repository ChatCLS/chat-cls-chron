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

server.get('/api/examSchedule', getExamSchedule);
server.get('/api/checkSessionExpiration', checkSessionExpiration);
server.get('/api/sendRankingResult', sendRankingResult);

/**
 * Starts an HTTP server and schedules cron tasks for periodic GET requests to an API endpoint.
 * The server listens on a specified port and sends initial and scheduled GET requests.
 *
 * @param {number} PORT - The port on which the HTTP server should listen.
 */
server.listen(PORT, async () => {
	await axios.get(config.localHostUrl + '/api/examSchedule').then((result) => {
		return result.status;
	});

	const daily6AMCron = getDaily6AMCron();
	const weekly10AMCron = getWeekly10AMCron();

	cron.schedule(daily6AMCron, async () => {
		await axios.get(config.localHostUrl + '/api/examSchedule').then((result) => {
			console.log('daily 6am cron', result.data);
			return result.status;
		});
	});

	cron.schedule('*/20 * * * * *', async () => {
		await axios
			.get(config.localHostUrl + '/api/checkSessionExpiration')
			.then((result) => {
				return result.status;
			});
	});

	cron.schedule(weekly10AMCron, async () => {
		await axios.get(config.localHostUrl + '/api/sendRankingResult').then((result) => {
			console.log('weekly 10am cron', result.data);
			return result.status;
		});
	});

	console.log(`listening on port ${PORT}`);
});
