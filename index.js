/*
  Shrimpo🍤
  Make chatbots quickly, and easily. Uses Dice's coefficient to compare strings and categorizes them into specific intents (works similarly to Google's Dialogflow).
  Made by Aleksander Wegrzyn (@penguins184 discord).
  Class made by Paige (@paigeroid discord).
*/


const stringSimilarity = require("string-similarity");
const fs = require("fs");
const def = "Sorry, I didn't understand. Can you please rephrase your question?";

class Shrimpo {
  constructor(defaults = def) {
    this.defaults = defaults;
    this.trainingData = {};
  }

  train(intent, trainingPhrases, trainingResponses, requirements, minimumMatchValue) {
    this.trainingData[intent] = {
      trainingPhrases: trainingPhrases.map(phrase => phrase.toLowerCase()),
      trainingResponses,
      minimumMatchValue: minimumMatchValue ? minimumMatchValue : 0.25
    };
  }

  ask(prompt) {
    const promptLowercase = prompt.toLowerCase();
    let closestMatch = null;
    let highestScore = 0;

    for (const intent in this.trainingData) {
      const trainingPhrases = this.trainingData[intent].trainingPhrases;

      const { bestMatch } = stringSimilarity.findBestMatch(promptLowercase, trainingPhrases);

      if (bestMatch.rating > highestScore) {
        highestScore = bestMatch.rating;
        closestMatch = intent;
      }
    }

    if (closestMatch && highestScore >= this.trainingData[closestMatch].minimumMatchValue) {
      const trainingResponses = this.trainingData[closestMatch].trainingResponses;
      const randomResponse = trainingResponses[Math.floor(Math.random() * trainingResponses.length)];
      return randomResponse;
    }

    if (Array.isArray(this.defaults)) {
      return this.defaults[Math.floor(Math.random() * this.defaults.length)];
    } else {
      return this.defaults;
    }
  }

  import(path) {
    const dataset = JSON.parse(fs.readFileSync(path, "utf8"));

    this.trainingData = dataset;
  }
}

module.exports = Shrimpo;