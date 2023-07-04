# Shrimpo🍤

Shrimpo makes creating AI easy! It uses keywords similar to those in Google"s DialogFlow and is a good alternative. To make your first chatbot, follow these 3 steps:

## 1. Train

Training the chatbot is simple. You need to make an intent, like a category, such as "Greetings", or "Insults". Then you must pass an array of training data - something that the chatbot can recognise as a greeting or insult. Then, finally, you can pass some training responses - what the chatbot will respond to those insults or greetings with. For example:

```js
const Shrimpo = require("Shrimpo");

let ai = new Shrimpo();

ai.train("Greetings", 
  ["Hi", "Hello", "Hey"],
  ["Hey! How are you?", "Hows it going?"]
);

ai.train("Insults",
  ["You're ugly", "You smell", "You suck"],
  ["No you", "I don't care"]
);
```

## 2. Set a default phrase

You can"t train a chatbot everything, and when it is prompted with something that it has no match to, it"ll resort to using a default phrase. You can pass a singular string as this, or an array where one will be randomly picked. For example:

```js
ai.defaults = "I don't get what you mean";

ai.defaults = ["Sorry, I don't know that one!", "Sorry, I don't know what you mean.", "I didn't quite catch that. Could you rephrase?"];
```

## 3. Ask!

Now just simply ask it something!

```js
console.log(ai.ask("Hi!"));
```

This makes for an easy, and pretty good chatbot! But wait! We can do even more!

## Importing Shrimpo Datasets

Shrimpo datasets look something like this:

```json
{
  "Greetings": {
    "trainingPhrases": ["hi", "hello", "hey"],
    "trainingResponses": ["Hey! How are you?", "How"s it going?"],
    "minimumMatchValue": 0.5
  },
  "Insults": {
    "trainingPhrases": ["you suck", "you smell"],
    "trainingResponses": ["No you", "I don"t care"],
    "minimumMatchValue": 0.3
  },
  "Farewell": {
    "trainingPhrases": ["bye", "see you later"],
    "trainingResponses": ["Goodbye!", "Take care!"],
    "minimumMatchValue": 0.6
  }
}
```

with the ai.import() function you can import datasets locally. A Shrimpo-Standard dataset is being heavily worked on at the moment and will soon be released to the public. E.g.

```js
const path = require("path");

ai.import(__dirname  + "/dataset.json");
//OR
ai.import("./dataset.json");
//OR
ai.import(path.json(__dirname + "/dataset.json"));
```

## Learning Mode

Coming soon! Requires import() so extra learning can be saved.