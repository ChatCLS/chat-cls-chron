const axios = require('axios');

const initiateQuiz = () => {
	axios
		.get(
			'https://b535-103-199-84-169.ngrok-free.app/api/questionSet/fetchLatestExamInformation'
		)
		.then((response) => {
			console.log('Quiz Initiated');
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports = { initiateQuiz };
