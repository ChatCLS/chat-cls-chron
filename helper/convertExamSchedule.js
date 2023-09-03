const moment = require('moment-timezone');

const convertDate = (inputDate) => {
	console.log('Input Date' + inputDate.toLocaleString());
	const duration = moment.duration({ days: 0, hours: -6, minutes: 0 }); // if we set time from local machine set hours: 0 and for heroko hours: -6

	// Parse the input date using moment-timezone
	const parsedInputDate = moment(inputDate);

	// Add the duration to the parsed input date
	const outputDate = parsedInputDate.add(duration);

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
	console.log(formattedOutputDate);

	return formattedOutputDate;
};

module.exports = { convertDate };
