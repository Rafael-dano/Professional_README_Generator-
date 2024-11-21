const inquirer = require('inquirer');
const fs = require('fs');

// Create the prompt module (required for Inquirer v8+)
const prompt = inquirer.createPromptModule();

// Prompt user for input
prompt([
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of your project?'
  },
  {
    type: 'input',
    name: 'description',
    message: 'Provide a short description of your project:'
  },
  {
    type: 'input',
    name: 'installation',
    message: 'What are the installation instructions?'
  },
  {
    type: 'input',
    name: 'usage',
    message: 'What are the usage instructions?'
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'Provide guidelines for contributing:'
  },
  {
    type: 'input',
    name: 'tests',
    message: 'Provide test instructions:'
  },
  {
    type: 'list',
    name: 'license',
    message: 'Choose a license for your project:',
    choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'None']
  },
  {
    type: 'input',
    name: 'github',
    message: 'What is your GitHub username?'
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email address?'
  }
])
  .then((answers) => {
    // Generate the README content from the user's input
    const readmeContent = generateREADME(answers);
    // Write the README content to a file
    writeToFile('README.md', readmeContent);
  })
  .catch((error) => {
    console.log('Error with prompts:', error);
  });

// Function to generate README content based on user input
function generateREADME(data) {
  return `
# ${data.title}

![License Badge](https://img.shields.io/badge/license-${data.license}-blue)

## Description
${data.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${data.installation}

## Usage
${data.usage}

## License
This project is licensed under the ${data.license} License.

## Contributing
${data.contributing}

## Tests
${data.tests}

## Questions
If you have any questions, feel free to reach out to me on GitHub: [${data.github}](https://github.com/${data.github}) or via email at ${data.email}.
  `;
}

// Function to write the generated README content to a file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) =>
    err ? console.log(err) : console.log('Successfully created README.md!')
  );
}
