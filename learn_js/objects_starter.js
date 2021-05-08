'use strict';

const rl = require('./rl_interface');

const _ = require('lodash');

function computingProps(){

	const bag = {};
	let propName = null;
	rl.question("enter the name of the property? ( propName )",(name)=>{
		console.log(name);

		bag[name] = 'value';
		
		rl.close();
	});

	rl.on('close',(event)=>{
		console.log(bag.propName);
	})

}
function task1(){
	const user = {
		name:'john',
		surname:'Smith'
	};
	user.name = 'Pete';
	delete user.name;
}

function taks2(){

	function isEmpty(obj){
		let counter = 0;
		for(key in obj){
			if(typeof(key)!== undefined){
				counter++;
			}
		}
		return counter>0?false:true;
	}

	// function isEmpty(obj) {
	// 	for (let key in obj) {
	// 		// если тело цикла начнет выполняться - значит в объекте есть свойства
	// 		return false;
	// 	}
	// 	return true;
	// }

	const user = {
		name:'john',
		surname:'Smith'
	};

	const oneProp = {
		prop1:'value',
	}
	const oneProp1 = {
		undefined:'value',
	}
	const oneProp2 = {
		val:undefined,
	}
	const onePro3 = {
	}

	console.log(isEmpty(user));
	console.log(isEmpty(oneProp));
	console.log(isEmpty(oneProp1));
	console.log(isEmpty(oneProp2));
	console.log(isEmpty(onePro3));
}

function taks3(){
	let salaries = {
		John: 100,
		Ann: 160,
		Pete: 130
	}
	let sum = 0;
	for(key in salaries){
		sum+=salaries[key];
	}
	console.log(sum);
}

function taks4(){
	let menu = {
		width: 200,
		height: 300,
		title: "My menu"
	};
	function multiplyNumeric(obj){
		for(key in obj){
			if(typeof(obj[key]) === 'number'){
				//console.log(obj[key]);
				obj[key]*=2;
			}
		}
	}
	multiplyNumeric(menu);
	console.log(menu);
}

function tasksEssentials(){
	//computingProps();
	//taks2();
	//taks3();
	taks4();
}

function assignObject(){
	const user = {name:'Name1'};

	let permissions1 = { canView: true };
	let permissions2 = { canEdit: true };

	Object.assign(user,permissions1,permissions2)
	console.log(user);


}

function assignObject2(){
	const user1 = {
		name:'Name1',
		lastName:'LastName2',
		inner:{
			prop1:'val1',
			prop2:'val2',
		}
	}
	const clone = Object.assign({},user1);
	console.log(clone.inner === user1.inner);

	const deepClone = _.cloneDeep(user1);
	console.log(deepClone.inner === user1.inner);
}

function garbageCollection(){

	function marry(man,woman){
		man.wife = woman;
		woman.husband = man;

		return{
			father:man,
			mother:woman
		}
	}
	const family = marry({
		name:'manName'
	},{
		name:'womanName'
	});
	console.log(family);

}

function objectCreation(){
	function User(name){
		//setting this when call with new
		if(!new.target){
			return new User(name)
		}
		this.name = name;
	}

	const user1 = User('name1');
	console.log(user1.name);

	function userBound(){
		console.log(this.name);
	}
	const userBounded = userBound.bind({name:'someName'});
	userBounded();
	
	function userBoundNew(name){
		this.name = name;
	}
	//steps when calling new
	const userObj = {};
	userObj.userBoundnew = userBoundNew;
	userObj.userBoundnew.bind(userObj);
	userObj.userBoundnew('name bound');
	console.log(userObj.name);
	
}
function objectCreation2(){

	function User(name) {
		//this = {}; // (неявно)
	
		// добавляет свойства к this
		this.name = name;
		this.isAdmin = false;
	
		//return this;//  (неявно)
	}
	console.log(new User('Filip').name);



	function BigUser() {

		this.name = "Вася";
	
		return { name: "Godzilla" };  // <-- возвращает этот объект
	}
	
	console.log( new BigUser().name );  // Godzilla, получили этот объект


	function SmallUser() {

		this.name = "Вася";
	
		return; // <-- возвращает this
	}
	
	console.log( new SmallUser().name );  // Вася

}

function objectCreationTasks(){
	
	function task1(){
		const obj = {}
		function A() {return obj}
		function B() { return obj}
		
		let a = new A;
		let b = new B;
		
		console.log( a == b ); // true
	}
	task1();
	function task2(){
		function Calculator() {

			this.read = function() {
				this.a = +prompt('a?', 0);
				this.b = +prompt('b?', 0);
			};
		
			this.sum = function() {
				return this.a + this.b;
			};
		
			this.mul = function() {
				return this.a * this.b;
			};
		}
		
		let calculator = new Calculator();
		calculator.read();
		
		alert( "Sum=" + calculator.sum() );
		alert( "Mul=" + calculator.mul() );
	}

	function task3(){
		function Accumulator(startingValue) {
			this.value = startingValue;
		
			this.read = function() {
				this.value += +prompt('Сколько нужно добавить?', 0);
			};
		
		}
		
		let accumulator = new Accumulator(1);
		accumulator.read();
		accumulator.read();
		alert(accumulator.value);
	}

}

function optionalChain(){

	function sample1(){
		const user = {};
		//works only in browser
	
		// try {
		// 	console.log(user?.address?.street);//error in node
		// } catch (error) {
		// 	console.log(error)
		// }
	
		// try {
		// 	console.log(user?.address.street);//error in node
		// } catch (error) {
		// 	console.log(error)
		// }
	
		// try {
		// 	console.log(user.address?.street);//error in node
		// } catch (error) {
		// 	console.log(error)
		// }
	}

	function sample2(){
		const user1 = {
			isAdmin:function(){
				console.log('admin')
			}
		};
		const user2 ={};
		// user1.isAdmin?.();
		// user2.isAdmin?.();
	}

	function symbolTest(){
		const id = Symbol('id');
		const user = {
			[id]:1244,
			name:'UserName',
			sayHi:function(){
				return `hi from ${this.name}`
			}
		}
		user.sayHi = user.sayHi.bind(user);
		console.log(user[id],user.sayHi());
	}

	function symbolTest1(){
		// читаем символ из глобального реестра и записываем его в переменную
		let id = Symbol.for("id"); // если символа не существует, он будет создан

		// читаем его снова в другую переменную (возможно, из другого места кода)
		let idAgain = Symbol.for("id");

		// проверяем -- это один и тот же символ
		console.log( id === idAgain ); // true
	}

	function symbolKeyFor(){

		// получаем символ по имени
		let sym = Symbol.for("name");
		let sym2 = Symbol.for("id");

		// получаем имя по символу
		console.log( Symbol.keyFor(sym) ); // name
		console.log( Symbol.keyFor(sym2) ); // id
	}


	function primitiveSamples(){

		function sample1(){

			let user = {
				name: "John",
				money: 1000,
			
				[Symbol.toPrimitive](hint) {
					console.log(`hint: ${hint}`);
					return hint == "string" ? `{name: "${this.name}"}` : this.money;
				}
			};
			
			// демонстрация результатов преобразований:
			console.log(user); // hint: string -> {name: "John"}
			console.log(+user); // hint: number -> 1000
			console.log(user + 500); // hint: default -> 1500

		}

		function sample2(){
			let user = {
				name: "John",
				money: 1000,
			
				// для хинта равного "string"
				toString() {
					return `{name: "${this.name}"}`;
				},
			
				// для хинта равного "number" или "default"
				valueOf() {
					return this.money;
				}
			
			};
			
			console.log(user); // toString -> {name: "John"}
			console.log(+user); // valueOf -> 1000
			console.log(user + 500); // valueOf -> 1500

			
		}

		sample2();
		//sample1();
	}

	primitiveSamples();
	//symbolKeyFor();
	//symbolTest1();
	//symbolTest();
	//sample1();
	//sample2();
	
}

function objectDestruction(){

	function sample3(){
		
		const options = {
			title: 'title',
			menu:'menu',
			dimentions:{
				width:'124',
				height:'331'
			}
		}

		const {title, ...rest} = options;

		console.log(title);
		console.log(rest.menu);
		console.log(rest.dimentions);
	}
	function sample4(){
		let title, width, height;

		//Чтобы показать JavaScript, что это не блок кода, мы можем заключить выражение в скобки (...)
		// сейчас всё работает
		({title, width, height} = {title: "Menu", width: 200, height: 100});

		console.log( title ); // Menu
	}

	function destructObjectWithFunctionCall(){
		
		// мы передаём объект в функцию
		const options = {
			name:'option name',
			items:['item1','item2']
		};

		// ...и она немедленно извлекает свойства в переменные
		//={} default parameter
		function showMenu({name='Untitled',width = 200,height=300,items=[]}={}){

			console.log(`name: ${name} \n width: ${width} \n height: ${height}`);
			console.log(items);
		}

		showMenu(options);
	}

	function destructObjectWithFunctionCallComplicated(){
		let options = {
			title: "My menu",
			items: ["Item1", "Item2"]
		};
		
		function showMenu({
			title = "Untitled",
			width: w = 100,  // width присваиваем в w
			height: h = 200, // height присваиваем в h
			items: [item1, item2] // первый элемент items присваивается в item1, второй в item2
		}) {
			console.log( `${title} ${w} ${h}` ); // My Menu 100 200
			console.log( item1 ); // Item1
			console.log( item2 ); // Item2
		}
		
		showMenu(options);
	}

	function destructiveAssignTasks(){
		function task1(){

			const user = {
				name: "John",
				years: 30
			};
			// function assignToVars({name='default',years:age,isAdmin=false}){
			// 	console.log( name ); // John
			// 	console.log( age ); // 30
			// 	console.log( isAdmin ); // false
			// }
			// assignToVars(user);

			const {name='default',years:age,isAdmin=false} = user;
				console.log( name ); // John
				console.log( age ); // 30
				console.log( isAdmin ); // false
		}
		

		function task2(){

			let salaries = {
				"John": 100,
				"Pete": 300,
				"Mary": 250
			};
			function topSalaryName(salaries){
				
				// for(let [key,value] of Object.entries(slrs)){
				// 	console.log(key,value);
				// }
				let arr = Array.from(Object.entries(salaries))
				if(arr.length===0){
					return null;
				}
				
				// .forEach(item=>{
				// 	console.log('0: ',item[0],'1: ',item[1]);
				// })

				//transform every element into object
				let res = arr.map((item)=>({key:item[0],value:item[1]}))
				.sort( (a,b) => {
					return b.value-a.value
				});

				console.log(res);
				return res[0].key;
			}
			console.log(topSalaryName(salaries));
		}

		task2();
		//task1();
	}

	
	
	destructiveAssignTasks();
	//destructObjectWithFunctionCallComplicated();
	//destructObjectWithFunctionCall();
	//sample4();
	//sample3();

}

(function Main(){
	//tasksEssentials();
	//assignObject();
	//assignObject2();

	//garbageCollection();

	//objectCreation();
	//objectCreation2();

	//objectCreationTasks();

	//optionalChain();

	objectDestruction();

})();