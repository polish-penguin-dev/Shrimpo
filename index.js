/*
  Shrimpo🍤
  Make chatbots quickly, and easily. Uses levenshtein distance to compare strings and categorizes them into specific intents (works similarly to Google's Dialogflow).
  Made by Aleksander Wegrzyn (penguins184 discord).
*/

const TrainingData = {};
let DefaultPhrase = "Sorry, I didn't understand. Can you please rephrase your question?"
const stringSimilarity = require("string-similarity");

function train(intent, trainingphrases, trainingresponses) {
  TrainingData[intent] = {
    trainingphrases: trainingphrases.map(phrase => phrase.toLowerCase()),
    trainingresponses
  };
}

function ask(prompt) {
  const promptLowercase = prompt.toLowerCase();
  let closestMatch = null;
  let highestScore = 0;

  for (const intent in TrainingData) {
    const trainingPhrases = TrainingData[intent].trainingphrases;

    const { bestMatch } = stringSimilarity.findBestMatch(promptLowercase, trainingPhrases);

    if (bestMatch.rating > highestScore) {
      highestScore = bestMatch.rating;
      closestMatch = intent;
    }
  }

  if (closestMatch) {
    const trainingResponses = TrainingData[closestMatch].trainingresponses;
    const randomResponse =
      trainingResponses[Math.floor(Math.random() * trainingResponses.length)];
    return randomResponse;
  }

  if(Array.isArray(DefaultPhrase)) {
    return DefaultPhrase[Math.floor(Math.random() * DefaultPhrase.length)];
  } else {
    return DefaultPhrase;
  }
}

function setDefaultPhrase(x) {
  DefaultPhrase = x;
}

module.exports = { train, ask, setDefaultPhrase };