const axios = require('axios');
const config = require('../config/config');

/**
 * Send ranking result
 *
 * @param {Request} req - The Express.js request object.
 * @param {Response} res - The Express.js response object.
 * @returns {Response} A response indicating the success or failure of the operation.
 */

const sendRankingResult = async (req, res) => {
	try {
		console.log(new Date().toLocaleString(), '🚀 Called send ranking result api 🚀');
		let data = await axios.post(`${config.messengerBotUrl}/api/leaderboard/leaderboard`);

		console.log(
			new Date().toLocaleString(),
			'🚀 Send ranking result response: 🚀',
			data.data
		);

		return res.status(200).send();
	} catch (error) {
		console.error('Error sending ranking result:', error.message);
		return res.status(500).send('Internal Server Error');
	}
};

module.exports = { sendRankingResult };
