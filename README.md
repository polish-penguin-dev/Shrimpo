# Shrimpo🍤

Shrimpo makes creating AI easy! It uses keywords similar to those in Google's DialogFlow and is a good alternative. To make your first chatbot, follow these 3 steps:

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

You can't train a chatbot everything, and when it is prompted with something that it has no match to, it'll resort to using a default phrase. You can pass a singular string as this, or an array where one will be randomly picked. For example:

```js
ai.defaults = "I don't get what you mean");

ai.defaults = ["Sorry, I don't know that one!", "Sorry, I don't know what you mean.", "I didnt quite catch that. Could you rephrase?"];
```

## 3. Ask!

Now just simply ask it something!

```js
console.log(ai.ask("Hi!"));
```

This makes for an easy, and pretty good chatbot! But wait! We can do even more!

## Learning Mode

Coming soon!