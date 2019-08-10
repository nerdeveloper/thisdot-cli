const program = require('commander');

program
    
    .description('CLI for checking Tax and Totals')
    .option('-z, --zipcode', 'zip code of your location')
    .option('-s, --subtotal', 'sub total of the the Amount')
    .version('1.0.0')

program.parse(process.argv);

