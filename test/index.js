const Shrimpo = require("shrimpo");
const ai = new Shrimpo();

ai.train("Greetings",
  ["hi", "hello"],
  ["yellow!"],
  { minimumMatchValue: 1 } 
);

console.log(ai.ask("hello"));