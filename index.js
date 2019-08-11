#!/usr/bin/env node
// npm link to make package global - This is only possible because of the first line of the script: #!/usr/bin/env node

const fs = require("fs");
const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");

const init = () => {
  console.log(
    chalk.green(
      figlet.textSync("Generate Template", {
        font: "Ghost",
        horizontalLayout: "default",
        verticalLayout: "default"
      })
    )
  );
};

const CURR_DIR = process.cwd();

const CHOICES = fs.readdirSync(`${__dirname}/templates`);

const askQuestions = () => {
  return inquirer
    .prompt({
      choices: CHOICES,
      name: "TEMPLATE_FOR",
      type: "list",
      message: "What template do you want?"
    })
    .then(({ TEMPLATE_FOR }) =>
      inquirer
        .prompt({
          type: "rawlist",
          name: "TEMPLATE",
          message: "What is the template you want to use?",
          choices: fs.readdirSync(`${__dirname}/templates/${TEMPLATE_FOR}`)
        })
        .then(({ TEMPLATE }) => {
          createDirectoryContents(
            `${__dirname}/templates/${TEMPLATE_FOR}/${TEMPLATE}`,
            TEMPLATE
          );

          return `${__dirname}/${TEMPLATE}`;
        })
    );
};

function createDirectoryContents(templatePath, newProjectPath) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`;

    if (file === "node_modules") {
      return;
    }

    // Folder is new
    if (!fs.existsSync(newProjectPath)) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}`);
    }

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, "utf8");

      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, "utf8");
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

      // recursive call
      createDirectoryContents(
        `${templatePath}/${file}`,
        `${newProjectPath}/${file}`
      );
    }
  });
}

const success = folderPath => {
  console.log(
    chalk.white.bgGreen.bold(`Done! File created at ${__dirname}${folderPath}`)
  );
};

const run = async () => {
  // show script introduction
  init();

  const folderPath = await askQuestions();

  // show success message
  success(folderPath);
};

run();
