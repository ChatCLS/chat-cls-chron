const axios = require('axios');
const fetchLatestExamSchedules = async () => {
	try {
		let res = await axios.get(
			'https://00c4-103-199-84-171.ngrok-free.app/api/questionSet/fetchCurrentDateExamSchedule'
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
