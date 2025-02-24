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
	const outputDate = moment(inputDate);

	let minute = outputDate.minute();
	let hour = outputDate.hour();
	let date = outputDate.date();
	let month = outputDate.month();

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
	console.log(inputDate, formattedOutputDate);

	return formattedOutputDate;
};

const getDaily6AMCron = () => {
	const targetTime = '06:00';
	const targetTimeZone = 'Asia/Dhaka';

	const targetUtcTime = moment.tz(targetTime, 'HH:mm', targetTimeZone).utc();
	const serverTime = targetUtcTime.clone().tz('Europe/Berlin');

	const hour = serverTime.format('H');
	const minute = serverTime.format('m');

	const cronExpression = `${minute} ${hour} * * *`;
	console.log('Cron expression for daily 6 AM:', cronExpression);

	return cronExpression;
};

const getWeekly10AMCron = () => {
	const targetTime = '10:00';
	const targetTimeZone = 'Asia/Dhaka';

	const targetUtcTime = moment.tz(targetTime, 'HH:mm', targetTimeZone).utc();
	const serverTime = targetUtcTime.clone().tz('Europe/Berlin');

	const hour = serverTime.format('H');
	const minute = serverTime.format('m');

	const cronExpression = `${minute} ${hour} * * 5`;
	console.log('Cron expression for weekly 10 AM:', cronExpression);

	return cronExpression;
};

module.exports = { convertDateToCron, getDaily6AMCron, getWeekly10AMCron };
