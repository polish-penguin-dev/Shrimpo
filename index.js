/*
  Shrimpo🍤
  Make chatbots quickly, and easily. Uses levenshtein distance to compare strings and categorizes them into specific intents (works similarly to Google's Dialogflow).
  Made by Aleksander Wegrzyn (@penguins184 discord).
  Class made by Paige (@paigeroid discord).
*/


const stringSimilarity = require("string-similarity");
const def = "Sorry, I didn't understand. Can you please rephrase your question?";


class Shrimpo {
	constructor(defaults=def) {
		this.defaults = defaults;
		this.trainingData = {};
	}

	train(intent, trainingphrases, trainingresponses) {
		this.trainingData[intent] = {
			trainingphrases: trainingphrases.map(phrase => phrase.toLowerCase()),
			trainingresponses
		};
	}

	ask(prompt) {
		const promptLowercase = prompt.toLowerCase();
		let closestMatch = null;
		let highestScore = 0;

		for (const intent in this.trainingData) {
			const trainingPhrases = this.trainingData[intent].trainingphrases;

			const { bestMatch } = stringSimilarity.findBestMatch(promptLowercase, trainingPhrases);

			if (bestMatch.rating > highestScore) {
				highestScore = bestMatch.rating;
				closestMatch = intent;
			}
		}

		
		if (closestMatch) {
			const trainingResponses = this.trainingData[closestMatch].trainingresponses;
			const randomResponse =
			trainingResponses[Math.floor(Math.random() * trainingResponses.length)];
			return randomResponse;
		}

		
		if (Array.isArray(this.defaults)) {
			return this.defaults[Math.floor(Math.random() * this.defaults.length)];
		} else {
			return this.defaults;
		}
	}
}


module.exports = Shrimpo;
