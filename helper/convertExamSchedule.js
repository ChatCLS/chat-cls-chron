const moment = require('moment-timezone');
const config = require('../config/config');

/**
 * Converts a given input date to a formatted string representing a cron expression.
 * The function takes into account a specified time zone offset to adjust the output date.
 *
 * @param {Date|string} inputDate - The input date to be converted (can be a Date object or a string in a recognized date format).
 * @returns {string} A formatted cron expression representing the converted date and time.
 */

const convertDateToCron = (inputDate) => {
	// First convert to Bangladesh time to ensure correct interpretation
	const bdTime = moment(inputDate).tz('Asia/Dhaka');

	// Guess the server timezone
	const serverTimezone = moment.tz.guess();
	console.log('Server Timezone:', serverTimezone);

	// Convert to UTC then to Server time
	const serverTime = bdTime.clone().utc().tz(serverTimezone);

	let minute = serverTime.minute();
	let hour = serverTime.hour();
	let date = serverTime.date();
	let month = serverTime.month();

	if (minute == 0) {
		hour = hour - 1;
		minute = 59;
	}
	if (hour == 0) {
		hour = 23;
		minute = 59;
		date = date - 1;
	}

	let formattedOutputDate = `${minute - 1} ${hour} ${date} ${month + 1} *`;
	console.log('Question Set Cron (BD Time):', bdTime.format('YYYY-MM-DD HH:mm'));
	console.log('Question Set Cron (Server Time):', serverTime.format('YYYY-MM-DD HH:mm'));
	console.log('Resulting Cron:', formattedOutputDate);

	return formattedOutputDate;
};

const getDaily6AMCron = () => {
	const targetTime = '06:00';
	const targetTimeZone = 'Asia/Dhaka';

	// Guess the server timezone
	const serverTimezone = moment.tz.guess();
	console.log('Server Timezone:', serverTimezone);

	const targetUtcTime = moment.tz(targetTime, 'HH:mm', targetTimeZone).utc();
	const serverTime = targetUtcTime.clone().tz(serverTimezone);

	const hour = serverTime.format('H');
	const minute = serverTime.format('m');

	const cronExpression = `${minute} ${hour} * * *`;
	console.log('Cron expression for daily 6 AM:', cronExpression);

	return cronExpression;
};

const getWeekly10AMCron = () => {
	const targetTime = '10:00';
	const targetTimeZone = 'Asia/Dhaka';

	// Guess the server timezone
	const serverTimezone = moment.tz.guess();
	console.log('Server Timezone:', serverTimezone);

	const targetUtcTime = moment.tz(targetTime, 'HH:mm', targetTimeZone).utc();
	const serverTime = targetUtcTime.clone().tz(serverTimezone);

	const hour = serverTime.format('H');
	const minute = serverTime.format('m');

	const cronExpression = `${minute} ${hour} * * 5`;
	console.log('Cron expression for weekly 10 AM:', cronExpression);

	return cronExpression;
};

module.exports = { convertDateToCron, getDaily6AMCron, getWeekly10AMCron };
