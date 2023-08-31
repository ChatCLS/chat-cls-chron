const express = require('express');
const server = express();

const { getExamSchedule } = require('./helper/initiateQuiz');

require('dotenv').config();
const PORT = 8000;

// let examSchedules = [];

server.get('/api/examSchedule', getExamSchedule);

server.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
