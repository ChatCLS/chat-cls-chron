const moment = require('moment-timezone');
const convertDate = (inputDate) => {
	const duration = moment.duration({ days: 0, hours: 0, minutes: 0 });

	// Parse the input date using moment-timezone
	const parsedInputDate = moment(inputDate);

	// Add the duration to the parsed input date
	const outputDate = parsedInputDate.add(duration);

	const formattedOutputDate = `${
		outputDate.minute() - 1
	} ${outputDate.hour()} ${outputDate.date()} ${outputDate.month() + 1} *`;
	console.log(formattedOutputDate);

	return formattedOutputDate;
};

module.exports = { convertDate };
