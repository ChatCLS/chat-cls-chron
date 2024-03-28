const express = require('express');
const server = express();
const cron = require('node-cron');
const { getExamSchedule } = require('./helper/initiateQuiz');
const { checkSessionExpiration } = require('./helper/checkSessionExpiration');
const { default: axios } = require('axios');
require('dotenv').config();
const config = require('./config/config');
const PORT = config.port;

server.get('/api/examSchedule', getExamSchedule);
server.get('/api/checkSessionExpiration', checkSessionExpiration);

/**
 * Starts an HTTP server and schedules cron tasks for periodic GET requests to an API endpoint.
 * The server listens on a specified port and sends initial and scheduled GET requests.
 *
 * @param {number} PORT - The port on which the HTTP server should listen.
 */
server.listen(PORT, async () => {
	await axios.get(config.localHostUrl + '/api/examSchedule').then((result) => {
		console.log(result.data);
		return result.status;
	});

	cron.schedule('0 6 * * *', async () => {
		await axios.get(config.localHostUrl + '/api/examSchedule').then((result) => {
			console.log(result.data);
			return result.status;
		});
	});

	cron.schedule('*/20 * * * * *', async () => {
		await axios
			.get(config.localHostUrl + '/api/checkSessionExpiration')
			.then((result) => {
				console.log(result.data);
				return result.status;
			});
	});

	console.log(`listening on port ${PORT}`);
});
