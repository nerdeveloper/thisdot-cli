#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const api = require('./api')
program
    
    .description('CLI for checking Tax and Totals')
    .option('-z, --zipcode <type>', 'zip code of your location')
    .option('-s, --subtotal  <type>', 'sub total of the the Amount')
    .version('0.0.1')


    program.on('--help', function(){
        console.log('');
        console.log('Examples:');
        console.log('');
        console.log('  $ thisdot-cli --zipcode 20500 --subtotal 100000.00');
      });

program.parse(process.argv);

var zipcode = ["20500", "20748", "34248", "37312", "46523",
"46523", "75093", "75876", "84111", "95361"];


const decimal = (program.subtotal - Math.floor(program.subtotal)) !== 0;

if (!decimal) {
  console.log(chalk.red(`Pass in a valid number e.g 10000.00`));
}

else if(program.zipcode === undefined) console.log(chalk.red(`error: Enter a valid zipcode --zipcode `));
 if(zipcode.includes(program.zipcode)) {
  api.calculate(program.zipcode, program.subtotal);
 }else{
  console.log(chalk.red(`error: Enter a valid zipcode that matches your location`));
 }

