const axios = require('axios');

const initiateQuiz = async () => {
	console.log('inside initiate quiz');
	await axios
		.get(
			'https://a44e-103-199-84-168.ngrok-free.app/api/questionSet/fetchLatestExamInformation'
		)
		.then((response) => {
			if (response.status === 200) {
				console.log('Quiz Initiated');
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports = { initiateQuiz };
