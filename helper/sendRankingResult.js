const axios = require('axios');
const config = require('../config/config');

const sendRankingResult = async () => {
	try {
		console.log(new Date().toLocaleString(), '🚀 Called send ranking result api 🚀');
		let data = await axios.post(`${config.messengerBotUrl}/api/leaderboard/leaderboard`);

		console.log(
			new Date().toLocaleString(),
			'🚀 Send ranking result response: 🚀',
			data.data
		);

		return true;
	} catch (error) {
		console.error('Error sending ranking result:', error.message);
		return false;
	}
};

module.exports = { sendRankingResult };
