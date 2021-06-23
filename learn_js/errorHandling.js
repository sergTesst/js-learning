'use strict';
const process = require('process');
const fs = require('fs')

function ObjectOfError(){

	function ErrorProps(){
		try {
			undefinedVar;
		} catch (error) {
			console.error('Error name: \n', error.name);
			console.error('Error message: \n', error.message);
			console.error('Error stack: \n', error.stack);
		}	
	}

	function generateOwnError(){
		const json = "{'name':'Oen'}"
		try {
			const user = JSON.parse(json);
			if(!user.age){
				throw new SyntaxError('Data is not full: no age prop');
			}
			undefinedMethodCall();

			console.log(user.age);
		} catch (error) {
			if(error.name == 'SyntaxError'){
				console.log('JSON Error: ', error.message);
				return;
			}
			throw error;
		}
	}

	function fibErrHandling(){
		const num = 100;
		let diff, res;
		// function fib(num){
		// 	if(num<0 || Math.trunc(num)!=num){
		// 		throw new Error(`Number ${num} is not valid`);
		// 	}
		// 	console.log(num);
		// 	return num<=1?num:fib(num-1)+fib(num-2);
		// }

		function fib(num){
			if(num<0 || Math.trunc(num)!=num){
				throw new Error(`Number ${num} is not valid`);
			}
			function fib(first,second,count, length){
				if(count<length){
					console.log(first);	
					return fib(second,first+second,++count,length);
				}
				return first;
			}
			return fib(0,1,0,num);
		}


		const start = Date.now();
		try {
			res = fib(num);
		} catch (error) {
			res = 0;
			console.log('error occured', error.message)
		}finally{
			diff = Date.now()-start;
		}
		console.log(`Result is ${res}. Time of execution ${diff}`);

	}

	function GlobalErrorHandling(){
		process.on('uncaughtException', (err, origin) => {
			fs.writeSync(
				process.stderr.fd,
				`Caught exception: ${err}\n` +
				`Exception origin: ${origin}`
			);
		});
		
		setTimeout(() => {
			console.log('This will still run.');
		}, 500);
		
		// Intentionally cause an exception, but don't catch it.
		nonexistentFunc();
		console.log('This will not run.');

	}
	function task1(){

		function sample1(){
			try {
				try {
					console.log('start working ');
					throw new Error('uncaughtException');
				} catch (error) {
					console.log(error.message);
					throw error;
					// return;
				}finally{
					console.log('cleaning');
				}
			} catch (error) {
				console.log('finally caught error');
			}
		}


		function sample2(){
			try {
				try {
					console.log('start working ');
					throw new Error('uncaughtException');
				} catch (error) {
					console.log(error.message);
					throw error;
					// return;
				}
				//Unreachable code detected
				console.log(' not cleaning');
				
			} catch (error) {
				console.log('finally caught error');
			}
		}


		sample1();
		sample2();


	}

	task1();
	// GlobalErrorHandling();
	// fibErrHandling();
	// generateOwnError();
	// ErrorProps();
	
}

function ErrorInheritance(){

	function PropErrorInheritance(){
		class CustomError extends Error{
			constructor(mes){
				super(mes);
				this.name = this.constructor.name;
			}
		}
	
		class ValidationError extends CustomError {}
		class PropertyError extends ValidationError {
			constructor(property){
				super("Property missing: ", property);
				this.property = property;
			}
		}
		console.log(new PropertyError('Prop').name);

	}



	function ErrorWrapping(){
		const alert = console.log;

		class ReadError extends Error {
			constructor(message, cause) {
				super(message);
				this.cause = cause;
				this.name = 'ReadError';
			}
		}
		
		class ValidationError extends Error { /*...*/ }
		class PropertyRequiredError extends ValidationError { /* ... */ }
		
		function validateUser(user) {
			if (!user.age) {
				throw new PropertyRequiredError("age");
			}
		
			if (!user.name) {
				throw new PropertyRequiredError("name");
			}
		}
		
		function readUser(json) {
			let user;
		
			try {
				user = JSON.parse(json);
			} catch (err) {
				if (err instanceof SyntaxError) {
					throw new ReadError("Синтаксическая ошибка", err);
				} else {
					throw err;
				}
			}
		
			try {
				validateUser(user);
			} catch (err) {
				if (err instanceof ValidationError) {
					throw new ReadError("Ошибка валидации", err);
				} else {
					throw err;
				}
			}
		
		}
		
		try {
			readUser('{bad json}');
		} catch (e) {
			if (e instanceof ReadError) {
				alert(e);
				// Исходная ошибка: SyntaxError:Unexpected token b in JSON at position 1
				alert("Исходная ошибка: " + e.cause);
			} else {
				throw e;
			}
		}

	}

	function tasks(){
		function task1(){
			const alert = console.log;
			
			class FormatError extends SyntaxError{
				constructor(message){
					super(message);


				}
			}

			let err = new FormatError("ошибка форматирования");

			alert( err.message ); // ошибка форматирования
			alert( err.name ); // FormatError
			alert( err.stack ); // stack

			alert( err instanceof FormatError ); // true
			alert( err instanceof SyntaxError ); // true (потому что наследует от SyntaxError)
		
		}
		task1();
	}


	tasks();
	// ErrorWrapping();

}


(function main(){

	ErrorInheritance();
	//ObjectOfError();
})();