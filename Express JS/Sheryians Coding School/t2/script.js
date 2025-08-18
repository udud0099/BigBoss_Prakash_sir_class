var giveMeAJoke = require("give-me-a-joke");

console.log("--t my joke");

var figlet = require("figlet");

figlet("Big     boss   Sir", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});

// To get a random dad joke
giveMeAJoke.getRandomDadJoke(function (joke) {
  console.log(joke);
});
