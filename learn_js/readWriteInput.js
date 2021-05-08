
const rl = require('readline');

const readLineInstance = rl.createInterface({
  input: process.stdin,
  output: process.stdout
});

readLineInstance.question('data? ', (answer) => {
	console.log(`your data ${answer}`);
	readLineInstance.close();
});

readLineInstance.on('close',(e)=>{
	// console.log('\n ended');
	// console.log(readLineInstance.history);
	// if(readLineInstance && Array.isArray(readLineInstance.history)){
	// 	let answers = Array.from(readLineInstance.history);
	// 	console.log(answers);
	// 	console.log(answers.includes('yes'));
	// }
	if(readLineInstance.history.includes('yes')){
		console.log('yes you agreed');
	}else{
		console.log("you disagreed");
	}
});
