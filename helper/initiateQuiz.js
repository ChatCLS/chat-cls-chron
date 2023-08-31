const axios = require('axios');
const cron = require('node-cron');
const { fetchLatestExamSchedules } = require('./latestQuizSchedule');
const { convertDate } = require('./convertExamSchedule');
const scheduledJobs = [];
const initiateQuiz = async () => {
	console.log('inside initiate quiz');
	await axios
		.get(
			'https://00c4-103-199-84-171.ngrok-free.app/api/questionSet/fetchLatestExamInformation'
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
	// console.log('inside get schedule');
	// let examSchedules = await fetchLatestExamSchedules();
	// if (examSchedules && examSchedules.length > 0) {
	// 	examSchedules.sort().forEach((element) => {
	// 		cron.schedule(convertDate(element), initiateQuiz);
	// 	});
	// }

	console.log('inside get schedule');

	try {
		// Fetch the latest exam schedules
		const examSchedules = await fetchLatestExamSchedules();

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

	return res.status(200).send();
};

module.exports = { initiateQuiz, getExamSchedule };
