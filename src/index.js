#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const ora = require('ora');
const boxen = require('boxen');
const api = require('./api');

program

  .description('CLI for checking Tax and Totals')
  .option('-z, --zipcode <type>', 'zip code of your location')
  .option('-s, --subtotal  <number>', 'sub total of the Amount')
  .version('0.0.1');

program.on('--help', function() {
  console.log('');
  console.log('Examples:');
  console.log('');
  console.log('  $ thisdot-cli --zipcode 20500 --subtotal 100000.00');
});

program.parse(process.argv);

(async () => {
  const zipcode = [
    '20500',
    '20748',
    '34248',
    '37312',
    '46523',
    '46523',
    '75093',
    '75876',
    '84111',
    '95361',
  ];

  if (program.zipcode === undefined && program.subtotal === undefined) {
    program.help();
  }

  if (program.zipcode && program.subtotal === undefined) {
    console.log(chalk.red(`error: Enter a valid subtotal`));
  } else if (program.subtotal && program.zipcode === undefined) {
    console.log(chalk.red(`error: Enter a valid zip code`));
  }

  if (program.subtotal && program.zipcode) {
    const checkifDecmailisPresent = program.subtotal.indexOf('.') < 1;
    if (checkifDecmailisPresent) {
      console.log(
        chalk.red(`error: pass in a valid decimal number e.g 10000.00`),
      );
    } else if (!zipcode.includes(program.zipcode)) {
      console.log(
        chalk.red(`error: Enter a valid zipcode that matches your location`),
      );
    } else {
      const spinner = ora('Submitting Data Inputs').start();
      setTimeout(() => {
        spinner.color = 'yellow';
      }, 1000);
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(1000);
      console.log(
        boxen(
          `Order Sub-Total: ${program.subtotal} \nZipcode: ${program.zipcode}`,
          {padding: 1, margin: 1, borderStyle: 'double', borderColor: 'blue'},
        ),
      );
      spinner.succeed('Submitted Data Inputs.');
      console.log(`Hey you! Please Wait ... 🛑🛑🛑`);
      await api.calculate(program.zipcode, program.subtotal);
    }
  }
})();
