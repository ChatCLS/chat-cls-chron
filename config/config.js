require('dotenv').config();
const config = {
	port: process.env.PORT || 8000,
	localHostUrl: process.env.LOCAL_HOST_URL || 'http://localhost:8000',
	chatClsHerokuUrl:
		process.env.CHAT_CLS_URL_HEROKU_URL ||
		'https://chat-cls-messenger-bot-dc8fc0cf2948.herokuapp.com',
	deployedInHerokuServer: process.env.DEPLOYED_IN_HEROKU_SERVER || false,
};

module.exports = config;
