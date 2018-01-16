const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('please input w word:', function (answer) {
    console.log('you have entered {%s}', answer.toUpperCase());
    rl.close();
});