
const rl = require('./rl_interface');




let user = {
	firstName:'Name',
	sayHi:function(){
		return `hi ${this.firstName}`;
	},
	sayHiToConsole:function(){
		console.log(this.sayHi());
	},
	sayHiWithTime:function(hours,minutes){
		return `[${hours}]:[${minutes}] \n hi ${this.firstName}`;
	},
}

//let sayHiBound = user.sayHi.bind(user);
// function sayHiCall(){
// 	console.log(sayHiBound())
// }

function bindAll(obj){
	for(key in obj){
		if(typeof(obj[key])==='function'){
			//console.log(`binding user: ${user}  key: ${key}`,obj[key])
			obj[key] = obj[key].bind(obj);
		}
	}
}
bindAll(user);

function sayHiWithDelay(){
	setTimeout(
		user.sayHiToConsole,
	1000);
}


function testDoubleer(){
	
	const mult = (a,b)=>a*b;
	const doubler = mult.bind(null,2);
	console.log(doubler(4))
	console.log(doubler(3))
	console.log(doubler(2))
}


function partial(func,...argBound){
	return function(...args){
		return func.call(this,...argBound,...args);
	}
}

user.sayNow = partial(
	user.sayHiWithTime,
	`${new Date().getHours()}:${new Date().getMinutes()}`);

function bindTest2(){
	function sayHi(){
		console.log(this.name);
	}
	sayHi = sayHi.bind({name:'Tomson'}).bind({name:'adamson'});
	sayHi();
}

function bindTest3(){
	function sayHi(){
		console.log(this.name);
	}
	sayHi.name = 32;
	const bound = sayHi.bind({name:'Tomson'});
	console.log(bound.test);
}



function bindTest4(){

	const rl = require('./rl_interface');

	rl.question("Password?",(answer)=>{
		rl.close();
	});

	rl.on('close',(event)=>{

		function askPassword(ok,fail){
			if(rl.history.includes('rockstar')){
				ok();
			}else{
				fail();
			}	
		}
		askPassword(user.loginOk.bind(user),user.loginFail.bind(user))

	})

	
	let user = {
		name: 'Вася',
	
		loginOk() {
			console.log(`${this.name} logged in`);
		},
	
		loginFail() {
			console.log(`${this.name} failed to log in`);
		},
	
	};

}

function bindTest5(){


	rl.question("Password?",(answer)=>{
		rl.close();
	});

	rl.on('close',(event)=>{

		function askPassword(ok,fail){
			if(rl.history.includes('rockstar')){
				ok();
			}else{
				fail();
			}	
		}
		//result true or false

		askPassword(user.login.bind(user,true),user.login.bind(user,false))

	})

	
	let user = {
		name: 'John',
	
		login(result) {
			console.log( this.name + (result ? ' logged in' : ' failed to log in') );
		}
	};

}


(function Main(){
	//console.log(user.sayNow("text that is being said now"));
	//bindTest2();
	//bindTest3();
	//bindTest4();
	//bindTest5();


})();


