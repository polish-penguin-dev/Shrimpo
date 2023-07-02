const { train, ask, setDefaultPhrase } = require("./index.js");

train("Greetings", ["Hi", "Hello", "Hey"], ["Hey! How are you?", "Hows it going?"]);

train("Insults", ["You're stupid", "Fuck you", "Kys", "You suck", "You're fat"], ["No you!", "I don't care"]);

setDefaultPhrase(["Sorry, I don't know that one!", "Sorry, I don't know what you mean.", "I didnt quite catch that. Could you rephrase?"]);

console.log(ask("weerhwwetty"));
console.log(ask("You're a fat pig"));
