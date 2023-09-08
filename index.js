/*
  Shrimpo v1.0.7
  Made by penguins184 and paigeroid
  Powered by Natural
*/

const natural = require("natural");
const fs = require("fs");
const def = "Sorry, I didn't understand. Can you please rephrase your question?";

class Shrimpo {
  constructor(defaults = def) {
    this.defaults = defaults;
    this.trainingData = {};
  }

  train(intent, trainingPhrases, trainingResponses, requirements, minimumMatchValue) {
    this.trainingData[intent] = {
      trainingPhrases: trainingPhrases.map(phrase => ({
        template: phrase.toLowerCase(),
        slots: this._extractSlots(phrase)
      })),
      trainingResponses,
      minimumMatchValue: minimumMatchValue ? minimumMatchValue : 0.25
    };
  }

  _extractSlots(phrase) {
    const slotPattern = /<([a-zA-Z0-9_]+)>/g;
    const slots = [];
    let match;

    while (match = slotPattern.exec(phrase)) {
      slots.push(match[1]);
    }

    return slots;
  }

  ask(prompt) {
    const promptLowercase = prompt.toLowerCase();
    let closestMatch = null;
    let highestScore = 0;
    let extractedData = {};

    for (const intent in this.trainingData) {
      for (const phraseObj of this.trainingData[intent].trainingPhrases) {
        const similarityScore = natural.JaroWinklerDistance(promptLowercase, phraseObj.template, { ignoreCase: true });

        if (similarityScore > highestScore) {
          highestScore = similarityScore;
          closestMatch = intent;
          
          if (phraseObj.slots.length) {
            extractedData = this._extractDataFromSlots(prompt, phraseObj.template, phraseObj.slots);
          }
        }
      }
    }

    if (closestMatch && highestScore >= this.trainingData[closestMatch].minimumMatchValue) {
      const trainingResponses = this.trainingData[closestMatch].trainingResponses;
      const randomResponse = trainingResponses[Math.floor(Math.random() * trainingResponses.length)];
      return { response: randomResponse, data: extractedData };
    }

    if (Array.isArray(this.defaults)) {
      return { response: this.defaults[Math.floor(Math.random() * this.defaults.length)], data: {} };
    } else {
      return { response: this.defaults, data: {} };
    }
  }

  _extractDataFromSlots(sentence, template, slots) {
    const data = {};
    const tokens = sentence.split(" ");
    const templateTokens = template.split(" ");

    slots.forEach(slot => {
      const position = templateTokens.indexOf(`<${slot}>`);
      if (position !== -1 && tokens[position]) {
        data[slot] = tokens[position];
      }
    });

    return data;
  }

  import(path) {
    const dataset = JSON.parse(fs.readFileSync(path, "utf8"));
    this.trainingData = dataset;
  }
}

module.exports = Shrimpo;
