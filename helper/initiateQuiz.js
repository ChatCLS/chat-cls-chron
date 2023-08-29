const axios = require('axios');

const initiateQuiz = async () => {
	console.log('inside initiate quiz');
	await axios
		.get(
			'https://edb5-103-199-84-171.ngrok-free.app/api/questionSet/fetchLatestExamInformation'
		)
		.then((response) => {
			console.log('Quiz Initiated');
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports = { initiateQuiz };
