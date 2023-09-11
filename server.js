const express = require('express');
const server = express();
const cron = require('node-cron');
const { getExamSchedule } = require('./helper/initiateQuiz');
const { default: axios } = require('axios');
require('dotenv').config();
const PORT = 8000;

server.get('/api/examSchedule', getExamSchedule);

/**
 * Starts an HTTP server and schedules cron tasks for periodic GET requests to an API endpoint.
 * The server listens on a specified port and sends initial and scheduled GET requests.
 *
 * @param {number} PORT - The port on which the HTTP server should listen.
 */
server.listen(PORT, async () => {
	await axios.get('http://localhost:8000/api/examSchedule').then((result) => {
		console.log(result.data);
		return result.status;
	});

	cron.schedule('0 6 * * *', async () => {
		await axios.get('http://localhost:8000/api/examSchedule').then((result) => {
			console.log(result.data);
			return result.status;
		});
	});

	console.log(`listening on port ${PORT}`);
});
