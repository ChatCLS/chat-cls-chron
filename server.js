const express = require('express');
const server = express();

const { getExamSchedule } = require('./helper/initiateQuiz');
const { default: axios } = require('axios');

require('dotenv').config();
const PORT = 8000;

// let examSchedules = [];

server.get('/api/examSchedule', getExamSchedule);

server.listen(PORT, async () => {
	await axios
		.get('https://5863-182-163-106-90.ngrok-free.app/api/examSchedule')
		.then((result) => {
			return result.status;
		});
	console.log(`listening on port ${PORT}`);
});
