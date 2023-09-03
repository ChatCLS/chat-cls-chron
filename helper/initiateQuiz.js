const axios = require('axios');
const cron = require('node-cron');
const { fetchLatestExamSchedules } = require('./latestQuizSchedule');
const { convertDate } = require('./convertExamSchedule');
const scheduledJobs = [];
const initiateQuiz = async () => {
	console.log('inside initiate quiz');
	await axios
		.get(
			'https://chat-cls-dev-2dd03a86834f.herokuapp.com/api/questionSet/fetchLatestExamInformation'
		)
		.then((response) => {
			if (response.status === 200) {
				console.log('Quiz Initiated');
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

const getExamSchedule = async (req, res) => {
	console.log('inside get schedule');

	try {
		// Fetch the latest exam schedules
		const examSchedules = await fetchLatestExamSchedules();
		console.log(
			'🚀 ~ file: initiateQuiz.js:28 ~ getExamSchedule ~ examSchedules:',
			examSchedules
		);

		// Stop all previously scheduled jobs
		scheduledJobs.forEach((job) => job.stop());
		scheduledJobs.length = 0; // Clear the array

		if (examSchedules && examSchedules.length > 0) {
			examSchedules.sort().forEach((element) => {
				// Schedule new jobs and keep track of them
				const job = cron.schedule(convertDate(element), initiateQuiz);
				scheduledJobs.push(job);
			});
		}

		return res.status(200).send();
	} catch (error) {
		console.error('Error setting exam schedules:', error);
		return res.status(500).send('Internal Server Error');
	}
};

module.exports = { initiateQuiz, getExamSchedule };
