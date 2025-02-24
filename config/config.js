require('dotenv').config();
const config = {
	port: process.env.PORT || 5002,
	localHostUrl: process.env.LOCAL_HOST_URL || 'http://localhost:5002',
	messengerBotUrl:
		process.env.MESSENGER_BOT_URL ||
		'http://fs4ckosk4o800ww4g4ck0gkc.207.180.238.162.sslip.io',
};

module.exports = config;
