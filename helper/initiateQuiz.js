const axios = require('axios');
const cron = require('node-cron');
const { fetchLatestExamSchedules } = require('./latestQuizSchedule');
const { convertDate } = require('./convertExamSchedule');
const config = require('../config/config');
const scheduledJobs = [];

/**
 * Retrieves the latest exam schedules, schedules quiz jobs, and stops previously scheduled jobs.
 *
 * @param {Request} req - The Express.js request object.
 * @param {Response} res - The Express.js response object.
 * @returns {Response} A response indicating the success or failure of the operation.
 */

const getExamSchedule = async (req, res) => {
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
				let cronScheduleTime = convertDate(element);
				const job = cron.schedule(cronScheduleTime, () => {
					axios
						.get(config.chatClsHerokuUrl + '/api/questionSet/fetchLatestExamInformation')
						.then((response) => {
							if (response.status === 200) {
								console.log('Quiz Initiated');
							}
						})
						.catch((err) => {
							console.log(err.message);
						});
				});
				scheduledJobs.push(job);
			});
		}

		return res.status(200).send();
	} catch (error) {
		console.error('Error setting exam schedules:', error.message);
		return res.status(500).send('Internal Server Error');
	}
};

module.exports = { getExamSchedule };
