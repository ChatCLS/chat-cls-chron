const axios = require('axios');
const cron = require('node-cron');
const { fetchLatestExamSchedules } = require('./latestQuizSchedule');
const { convertDateToCron } = require('./convertExamSchedule');
const config = require('../config/config');
const scheduledJobs = [];

const getExamSchedule = async () => {
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
			examSchedules.forEach((element) => {
				// Schedule new jobs and keep track of them
				let cronScheduleTime = convertDateToCron(element);
				const job = cron.schedule(cronScheduleTime, () => {
					axios
						.get(config.messengerBotUrl + '/api/questionSet/fetchLatestExamInformation')
						.then((response) => {
							if (response.status === 200) {
								console.log(
									`${moment().tz('Asia/Dhaka').format('DD-MM-YYYY HH:mm')} Quiz Initiated`
								);
							}
						})
						.catch((err) => {
							console.log(err.message);
						});
				});
				scheduledJobs.push(job);
			});
		}

		return true;
	} catch (error) {
		console.error('Error setting exam schedules:', error.message);
		return false;
	}
};

module.exports = { getExamSchedule };
