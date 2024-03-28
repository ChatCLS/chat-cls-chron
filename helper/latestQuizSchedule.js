const axios = require('axios');
const config = require('../config/config');

/**
 * Fetches the latest exam schedules from a remote API.
 *
 * @returns {Promise<Object[]>} A Promise that resolves to an array of exam schedules.
 * @throws {Error} If an error occurs during the API request.
 */
const fetchLatestExamSchedules = async () => {
	try {
		let res = await axios.get(
			`${config.chatClsHerokuUrl}/api/questionSet/fetchCurrentDateExamSchedule`
		);

		return res.data['examSchedule'];
	} catch (err) {
		console.log(
			'🚀 ~ file: latestQuizSchedule.js:10 ~ fetchLatestExamSchedules ~ err:',
			err.message
		);
	}
};
module.exports = { fetchLatestExamSchedules };
