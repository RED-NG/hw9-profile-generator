const axios = require("axios");
const inquirer = require("inquirer");
const generateHTML = require("./generateHTML");

const questions = [
  { type: "input", name: "username", message: "Enter your GitHub username: " },
  {
    type: "list",
    name: "color",
    message: "What is your favorite color?",
    choices: ["green", "blue", "pink", "red"]
  }
];

function writeToFile(fileName, data) {}

function init() {
  inquirer.prompt(questions).then(function({ username, color }) {
    const queryURL = `https://api.github.com/users/${username}`;
    axios.get(queryURL).then(function({ data }) {
      console.log(data);
    });
  });
}

init();
