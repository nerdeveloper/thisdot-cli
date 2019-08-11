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
