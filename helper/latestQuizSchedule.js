const axios = require('axios');

/**
 * Fetches the latest exam schedules from a remote API.
 *
 * @returns {Promise<Object[]>} A Promise that resolves to an array of exam schedules.
 * @throws {Error} If an error occurs during the API request.
 */
const fetchLatestExamSchedules = async () => {
	try {
		let res = await axios.get(
			'https://chat-cls-dev-2dd03a86834f.herokuapp.com/api/questionSet/fetchCurrentDateExamSchedule'
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
