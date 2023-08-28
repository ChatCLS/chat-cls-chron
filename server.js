const cron = require('node-cron');

const express = require('express');
const server = express();
const mongoose = require('mongoose');
const { initiateQuiz } = require('./helper/initiateQuiz');
const { convertDate } = require('./helper/convertExamSchedule');
require('dotenv').config();
const PORT = 8000;

const dbConnect = () => {
	mongoose
		.connect(process.env.MONGO_URL)
		.then(() => {
			console.log('Database is connected');
		})
		.catch((err) => {
			console.log('Error connecting to database: ' + err.message);
		});
};

server.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
	dbConnect();
	cron.schedule(convertDate('2023-08-27T17:56:00.165+00:00'), initiateQuiz);
});
