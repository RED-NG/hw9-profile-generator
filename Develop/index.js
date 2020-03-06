const axios = require("axios");
const inquirer = require("inquirer");
const generateHTML = require("./generateHTML");
const pdf = require("html-pdf");

const questions = [
  { type: "input", name: "username", message: "Enter your GitHub username: " },
  {
    type: "list",
    name: "color",
    message: "What is your favorite color?",
    choices: ["green", "blue", "pink", "red"]
  }
];

function init() {
  inquirer.prompt(questions).then(function({ username, color }) {
    const queryURL = `https://api.github.com/users/${username}`;
    axios.get(queryURL).then(function({ data }) {
      console.log(color);
      console.log(username);
      // console.log(data);
      console.log(data.followers);
      console.log(data.avatar_url);
      console.log(data.location);
      console.log(data.bio);
      console.log(data.name);
      console.log(data.login);
      console.log(data.public_repos);

      const gitProfile = {
        color: color,
        username: data.username,
        avatar_url: data.avatar_url,
        name: data.name,
        location: data.location,
        bio: data.bio,
        public_repos: data.public_repos,
        followers: data.followers,
        following: data.following,
        github: data.login
      };
      pdf
        .create(generateHTML(gitProfile))
        .toFile(`./${gitProfile.name}.pdf`, function(err, res) {
          if (err) console.log(err);
          console.log(res);
        });
    });
  });
}

init();
