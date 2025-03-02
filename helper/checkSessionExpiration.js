const axios = require('axios');
const config = require('../config/config');

const checkSessionExpiration = async () => {
	try {
		await axios.post(`${config.messengerBotUrl}/api/session/checkSessionExpiration`);

		return true;
	} catch (error) {
		console.error('Error setting exam schedules:', error.message);
		return false;
	}
};

module.exports = { checkSessionExpiration };
