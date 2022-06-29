const fs = require('fs');
// console.log('App Name = ', process.env.APP_NAME);
const input = process.argv;
// Run file as node getInputFromTerminal.js 100 200 
// console.log('add of two numbers = ', parseInt(input[2]) + parseInt(input[3]));

// Run file as node getInputFromTerminal.js add_file / remove_file hello.txt "This is test file."
if (input[2] == 'add_file') {
    fs.writeFileSync(input[3], input[4]);
    console.log(input[3], ' File created!');
} else if (input[2] == 'remove_file') {
    fs.unlinkSync(input[3]);
    console.log(input[3], ' File removed!');
} else {
    console.log('Invalid input');
}