const axios = require('axios');
const config = require('../config/config');

/**
 * Check if any session has expired.
 *
 * @param {Request} req - The Express.js request object.
 * @param {Response} res - The Express.js response object.
 * @returns {Response} A response indicating the success or failure of the operation.
 */

const checkSessionExpiration = async (req, res) => {
	try {
		console.log(new Date().toLocaleString(), '🚀 Called session expiration api 🚀');
		let data = await axios.post(
			`${config.messengerBotUrl}/api/session/checkSessionExpiration`
		);

		console.log(
			new Date().toLocaleString(),
			'🚀 Session expiration response: 🚀',
			data.data
		);

		return res.status(200).send();
	} catch (error) {
		console.error('Error setting exam schedules:', error.message);
		return res.status(500).send('Internal Server Error');
	}
};

module.exports = { checkSessionExpiration };
