const axios = require('axios');
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
