'use strict';

const cl = console.log;


function RecursionTest(){
	function TestPow(){

		function pow(x,n){
			return (n==1)?x:(x*(pow(x,n-1)))
		}
		console.log(pow(4,8));
	}

	function testSumSalaries(){
		let company = { // тот же самый объект, сжатый для краткости
			sales: [{name: 'John', salary: 1000}, {name: 'Alice', salary: 600 }],
			development: {
				sites: [{name: 'Peter', salary: 2000}, {name: 'Alex', salary: 1800 }],
				internals: [{name: 'Jack', salary: 1300}]
			}
		};


		function sumSalaries(department){
			if(Array.isArray(department)){
				let sum = department.reduce((prev,current)=>prev+current.salary,0);
				return sum;
			}else{
				let sum = 0;
				for(const item of Object.values(department)){
					sum+=sumSalaries(item);
				}
				return sum;
			}
		}
		console.log(sumSalaries(company));
	}

	function sumVariants(){

		function sumRecursive(n){
			let sum = 0;
			if(n>0){
				sum+=n+sumRecursive(n-1);
			}
			return sum;
		}
		const sumRec = sumRecursive(10);
		console.log(sumRec);

		
		function sumLoop(n){
			let sum = 0;
			for (let index = 0; index <= n; index++) {
				sum+=index;
			}
			return sum;
		}

		const sumLp = sumLoop(10);
		console.log(sumLp);

		function sumProgression(a1,d,n){
			return (2*a1+d*(n-1))*n/2
		}
		const sumP = sumProgression(1,1,10);
		console.log(sumP);
	}

	function factorialTest(){
		function factorialOnlyResult(n){
			return n==1?n:n*factorialOnlyResult(n-1);
		}
		const fact = factorialOnlyResult(10);
		console.log(fact);

		function factorialLog(n){
			if(n==1){
				return n;
			}
			let res = n*factorialLog(n-1);
			console.log(res);
			return res;
		}
		factorialLog(10);
		
	}

	function testFibonachi(){


		function fib(n) {
			return n <= 1 ? n : fib(n - 1) + fib(n - 2);
		}

		function fibLoop(n) {
			let a = 1;
			let b = 1;
			for (let i = 3; i <= n; i++) {
				let c = a + b;
				a = b;
				b = c;
			}
			return b;
		}

		function getNFibonachiNumber(n){
			let arr = [];
			function fibonachiNums(first,second,counter,length){
				if(counter<length){
					console.log(second);
					arr.push(second);
					return fibonachiNums(second,first+second,++counter,length);
				}
			}
			fibonachiNums(0,1,0,n);
			return arr[arr.length-1];
		}
		console.log('result: ',getNFibonachiNumber(7));
		console.log('result: ',getNFibonachiNumber(18));
	}

	function testLinkedListLog(){

		let listData = {
			value: 1,
			next: {
				value: 2,
				next: {
					value: 3,
					next: {
						value: 4,
						next: null
					}
				}
			}
		};

		function linkedListLog(list){
			if(list){
				console.log(list.value);
				linkedListLog(list.next);
			}
		}

		function linkedListLoopLog(list){
			while(list){
				console.log(list.value);
				list = list.next;
			}
		}

		function printReverseList(list) {

			if (list.next) {
				printReverseList(list.next);
			}
		
			console.log(list.value);
		}


		function linkedListInvertedLog(list){
			let arr = [];

			while(list){
				arr.push(list.value);
				list = list.next;
			}
			for (let index = arr.length-1; index >= 0; index--) {
				const element = arr[index];
				console.log(element);
			}
		}

		printReverseList(listData);
		//linkedListInvertedLog(listData);
		// linkedListLoopLog(listData);
		//linkedListLog(listData);

	}
	

	testLinkedListLog();
	//testFibonachi();
	// factorialTest();
	//sumVariants();
	//testSumSalaries();
	//TestPow();
}


function DecoratorTest(){

	function testFunctionCaching(){

		function slow(x) {
			// здесь могут быть ресурсоёмкие вычисления
			console.log(`Called with ${x}`);
			return x;
		}
		//кеширующий декоратор не подходит для работы с методами объектов.
		function cachingDecorator(func) {
			let cache = new Map();

			return function(x) {
				if (cache.has(x)) {    // если кеш содержит такой x,
					return cache.get(x); // читаем из него результат
				}
		
				let result = func(x); // иначе, вызываем функцию
		
				cache.set(x, result); // и кешируем (запоминаем) результат
				return result;
			};
		}
		
		slow = cachingDecorator(slow);//cachingDecorator must return function with arguments
		// let slower = cachingDecorator(slow);// does not matter slow or slower 
		
		console.log('First: ', slow(1) ); // slow(1) кешируем
		console.log( "Again: " + slow(1) ); // возвращаем из кеша
		
		console.log('Second: ', slow(2) ); // slow(2) кешируем
		console.log( "Again: " + slow(2) ); // возвращаем из кеша

	}

	function testFuncDecorationWithObject(){
		

		let worker = {
			someMethod() {
				return 1;
		},

			slow(x) {
				console.log("Called with " + x);
				return x * this.someMethod(); // (*)
			},

			slowSumMinMax(min, max) {
				console.log(`Called with ${min},${max}`);
				return min + max;
			}
		};


		function cachingDecorator(func,hash) {
			let cache = new Map();

			return function() {//x is an argument of func
				let key = hash(arguments);//arguments that were passed in func
				if (cache.has(key)) {
					console.log('from cache')
					return cache.get(key);
				}
								
				//передаёт текущий this (=worker) и текущий аргумент (=2) в оригинальную функцию.
				let result = func.apply(this,arguments);
				// let result = func.call(this,...arguments);
				cache.set(key, result);
				console.log('calculated')
				return result;
			};

		}

		// function hash(args){
		// 	console.log('calling hash');
		// 	if(Array.isArray(args)){
		// 		return args.toString();
		// 	}
		// }
		function hash(){
			
			// let resultHasFromObjValues = Object.values(arguments[0]).toLocaleString();
			// console.log(resultHasFromObjValues);

			let hashResult = [].join.call(Object.values(arguments[0]));
			// console.log(hashResult)

			return hashResult;
		}
		
		console.log( worker.slow(1) );

		//worker.slow = worker.slow.bind(worker);

		worker.slow = cachingDecorator(worker.slow,hash);

		console.log( worker.slow(2) );//this=worker assigned here 
		console.log( worker.slow(2) ); 

		worker.slowSumMinMax = cachingDecorator(worker.slowSumMinMax,hash)


		console.log( worker.slowSumMinMax(2,6) );//this=worker assigned here 
		console.log( worker.slowSumMinMax(122,17) ); 
	}

	//Существует специальный встроенный метод функции 
	//func.call(context, …args), который позволяет 
	//вызывать функцию, явно устанавливая this.
	//Он запускает функцию func, используя первый аргумент
	// как её контекст this, а последующие – как её аргументы.

	function testCall(){

		function sayHi(somePhrase='') {
			console.log(this.name,' ',somePhrase);
		}
		
		let user = { name: "John" };
		let admin = { name: "Admin" };
		
		// используем 'call' для передачи различных объектов в качестве 'this'
		sayHi.call( user,"my arguments","argument" ); // John
		sayHi.call( admin ); // Admin
	}

	function Tasks(){

		function task1(){

			function work(a, b) {
				console.log(`work ${a}+${b}=`, a + b ); // произвольная функция или метод
			}
			function spy(func){
				
				function wrapper(...args){
					console.log('args: ', args);
					console.log('arguments: ',arguments);
					let hashResult = [].join.call(args);
					wrapper.calls.push(hashResult);
					return func.apply(this,arguments);
				}
				wrapper.calls = [];
				return wrapper;
			}
			
			work = spy(work);
			
			work(1, 2); // 3
			work(4, 5); // 9
			

			console.log('calls:',work.calls)

			for (let args of work.calls) {
				console.log( 'call:' + args ); // "call:1,2", "call:4,5"
			}
		}
		function task2(){

			function f(x) {
				console.log(x);
			}
			function delay(func,time){
				// return function(x){//rest params

				// 	setTimeout(()=>{
				// 		func.call(this,x);
				// 	},time)
				// }
				return function(...args){//rest params

					setTimeout(()=>{
						func.apply(this,arguments);
					},time)
				}
			}
			
			// создаём обёртки
			let f1000 = delay(f, 1000);
			let f1500 = delay(f, 1500);
			
			//assign this to f1000
			f1000("test1"); // показывает "test" после 1000 мс

			//assign this to f1500
			f1500("test2"); // показывает "test" после 1500 мс
		}
		function task3(){
			function sayHi(){
				console.log('hi from ',arguments)
			}

			function debounce(func,time){
				let allowedToCall = true;
				return function(...args){//func rest params
					if(!allowedToCall){
						return;
					}
					func.apply(this,args);
					allowedToCall = false;
					setTimeout(()=>{
						allowedToCall = true;
					},time)
				}
			}

			let f = debounce(sayHi, 1000);
			f(1); // выполняется немедленно
			f(2); // проигнорирован

			setTimeout( () => f(3), 100); // проигнорирован (прошло только 100 мс)
			setTimeout( () => f(4), 1100); // выполняется
			setTimeout( () => f(5), 1500); // проигнорирован (прошло только 400 мс от последнего вызова)
		}


		function task4(){

			function f(a) {
				console.log(a,arguments)
			}
			
			function throttle(func,time){
				let allowedToCall = true;

				function wrapper(...args){//func rest params

					//Обратите внимание, что контекст и аргументы одинаково важны и должны быть запомнены. 
					if(!allowedToCall){
						wrapper.savedArgs = arguments;
						wrapper.savedThis = this;
						console.log(func,args)
						return;
					}

					func.apply(this,args);//this is f1000, (args is 1 for first call)
					
					allowedToCall = false;
					setTimeout(()=>{
						allowedToCall = true;
						if(wrapper.savedArgs){

							wrapper.apply(wrapper.savedThis,wrapper.savedArgs);//calling wrapper with last this and argumets
							wrapper.savedThis = null;
							wrapper.savedArgs = null;
						}

					},time)

				}
				
				return wrapper;

			}

			// f1000 передаёт вызовы f максимум раз в 1000 мс
			let f1000 = throttle(f, 1000);
			
			f1000(1); // показывает 1
			f1000(2); // (ограничение, 1000 мс ещё нет)
			f1000(3); // (ограничение, 1000 мс ещё нет)
			
			// когда 1000 мс истекли ...
			// ...выводим 3, промежуточное значение 2 было проигнорировано

		}



		task4();
		//task3();
		//task2();
		//task1();
	}

	Tasks();
	//testFuncDecorationWithObject();
	//testCall();
	//testFunctionCaching();
}

function testClosure(){
	
	function testInnerOuterVars(){

		function test1(){
			let name = "John";

			function sayHi() {
				console.log("Hi, " + name);
			}
			
			name = "Pete";
			
			sayHi(); // что будет показано: "John" или "Pete"?
		}

		function test2(){
			function makeWorker(){
				let name ='pete';
				return function(){
					console.log(name);
				}
			}
			let name = 'richard';
			const worker = makeWorker();
			worker();//pete

		}
		test2();

		function makeCouter(){
			let couter = 0;
			return function(){
				couter++;
			}
		}
	}

	function task3(){
		let phrase = "Hello";

		if (true) {
			let user = "John";

			function sayHi() {
				console.log(`${phrase}, ${user}`);
			}
			sayHi();
		}

	}

	function task4(){
		function sum(num1){
			return function(num2){
				return num1+num2;
			}
		}
		// let res = sum(2)(22);
		// console.log(res);

		let res = sum(2)
		console.log(res(21));
	}

	function task5(){

		let arr = [1, 2, 3, 4, 5, 6, 7];
	
		function inBetween(a, b) {
			return function(x){
				return x>a && x<b;
			}
		}
		
		function inArray(arr) {
			return function(x){
				return arr.includes(x);
			}
		}
		let res1 = arr.filter(inBetween(1,4));

		console.log(res1);

		let res2 = arr.filter(inArray([1,4,2]));
		console.log(res2);


	}

	function task6(){
		let users = [
			{ name: "John", age: 20, surname: "Johnson" },
			{ name: "Pete", age: 18, surname: "Peterson" },
			{ name: "Ann", age: 19, surname: "Hathaway" }
		];

		// // по имени (Ann, John, Pete)
		// users.sort((a, b) => a.name > b.name ? 1 : -1);

		// // по возрасту (Pete, Ann, John)
		// users.sort((a, b) => a.age > b.age ? 1 : -1);

		//console.log(Object.keys(users[0]));

		function byField(fieldName){
			return function(userA,userB){

				if(Object.keys(userA).includes(fieldName) 
					&& Object.keys(userB).includes(fieldName)){
						return userA[fieldName]>userB[fieldName]?1:-1;
				}

			}
		}

		let resByName = users.sort(byField('name'));
		console.log(resByName);
		let resByAge = users.sort(byField('age'));
		console.log(resByAge);

	}

	function task7(){

		// function makeArmy() {
		// 	let shooters = [];

		// 	for (let index = 0; index < 10; index++) {

		// 		let shooter = function() { 
		// 			console.log( index ); 
		// 		};
		// 		shooters.push(shooter);
		// 	}

		// 	return shooters;
		// }

		function makeArmy() {
			let shooters = [];
		
			let i = 0;
			//создаёт новое лексическое окружение для каждой итерации
			while (i < 10) {
				let j = i;
				let shooter = function() { 
					console.log( j ); 
				};
				shooters.push(shooter);
				i++;
			}
		
			return shooters;
		}
		
		let army = makeArmy();
		
		army[0]();
		army[5](); 
		army[8](); 
		

	}

	task7();
	// task6();
	// task5();
	// task4();
	//task3();
	// testInnerOuterVars();

}


function lambdaFuncs(){

	function deferedCallFunc(){
		function test1(){
			function decoratorOfFuncCreator(fn,ms){
				return function(){
					console.log('arguments ', arguments);
					setTimeout(()=>{fn.call(this,...arguments)},ms);
				}
			}
	
			function logSmth(msg){
				console.log('logging message', msg);
			}
	
			const logWithDelay = decoratorOfFuncCreator(logSmth,500);
			logWithDelay('my message');

		}

		function test2(){

			function decoratorOfFuncCreator(fn,ms){

				console.log('arguments ', arguments);
				console.log('...arguments ', ...arguments);
				console.log('this ', this.toString())

				setTimeout(()=>{

					console.log('this inside  setTimeout', this.toString())
					console.log('fn.call(this,...arguments)},ms); ')
					fn.call(this,...arguments)

					console.log('fn(...arguments); ')
					fn(...arguments);


					console.log('fn(arguments); ')
					fn(arguments);
				
				},ms);
				
			}
	
			function logSmth(msg){

				// Array.prototype.forEach.call(arguments, function(item) {
				// 	console.log('logging message', msg);
				// });

				//not working without prototype

				Array.prototype.forEach.call(arguments, function print(item) {
					console.log('logging message', msg);
				});
				
			}
	
			decoratorOfFuncCreator(logSmth,500,'my first argument','my second argument');
			console.log('Array ',Array)
			console.log('Array.prototype ',Array.prototype)

		}


		function test3(){
			function decoratorOfFuncCreator(fn,ms){

				//creating new function with parameters
				return  function(...args){

					console.log('arguments ', args);
					console.log('this',this.toString());
					let globalContext = this;
					setTimeout(function (){
							let localContext = this; 
							console.log(localContext===globalContext)
							console.log('this',this.toString());
							fn.call(globalContext,...args)
						},ms);
				}

			}
	
			function logSmth(msg){
				console.log('logging message', msg);
			}
	
			const logWithDelay = decoratorOfFuncCreator(logSmth,500);
			logWithDelay('my message');

		}

		test3();
		//test2();
		//test1();


	}
	function groupObjMethod(){

		let group = {
			title: "Our Group",
			students: ["John", "Pete", "Alice"],
		
			showList() {
				this.students.forEach(
						function(student) {
						// Error: Cannot read property 'title' of undefined
						console.log(this.title + ': ' + student)
					}.bind(this)
				);
			}
		};
		
		group.showList();


	}

	//groupObjMethod();
	deferedCallFunc();
}

function flagsAndDescriptors(){

	function sample1(){

		let animal = {
			species:'species1',
			name:'animalName1'
		}
	
		let descriptor = Object.getOwnPropertyDescriptor(animal,'species');
		console.log(descriptor);

		// {
		//   value: 'species1',
		//   writable: true,
		//   enumerable: true,
		//   configurable: true
		// }

	}

	function sample2(){
		let user = {};

		Object.defineProperty(user,'profession',{
			value:'Manager'
		});
		let descriptor = Object.getOwnPropertyDescriptor(user,'profession');
		console.log(descriptor);

		// {
		// 	value: 'Manager',
		// 	writable: false,
		// 	enumerable: false,
		// 	configurable: false
		// }
		try {
			user.profession = 'New profession that cann"t be set';
			console.log(user.profession);
			//Manager
		} catch (error) {
			console.log(error.toString());
		}

		Object.defineProperty(user,'ChangableProperty',{
			value:'DefaultValue',
			writable:true
		});
		console.log(user.ChangableProperty);
		console.log('user entries', Object.entries(user))

		user.ChangableProperty = 'NewValue';

		console.log(user.ChangableProperty);
	}

	function OnlyFoReading(){
		let animal = {
			species:'species1',
			name:'animalName1',
			toString(){
				return `${this.name}, ${this.species}`
			}
		}

		console.log(Object.keys(animal));
		//[ 'species', 'name', 'toString' ]

		Object.defineProperty(animal,'toString',{
			enumerable:false
		});
		console.log(Object.keys(animal));
		//[ 'species', 'name' ]
	}

	function notConfigurableProp(){
		console.log(Object.getOwnPropertyDescriptor(Math,'PI'));

		const day = {};
		Object.defineProperty(day,'hours',{
			value:'24',
			writable:false,
			configurable:false
		})
		console.log(Object.getOwnPropertyDescriptor(day,'hours'));

		try {
			Object.defineProperty(day,'hours',{
				writable:true,
			})
		} catch (error) {
			console.log(error.toString())
		}
	}
	function Object_defineProperties(){
		const person = {};

		Object.defineProperties(person,{
			gender:{value:'Male',writable:false,enumerable:true},
			profession:{value:'UserProfession',writable:true,enumerable:true}
		})

		console.log(Object.keys(person))
		//[ 'gender', 'profession' ]
	
	
	}
	function Object_getOwnPropertyDescriptors(){

		const person = {};

		Object.defineProperties(person,{
			gender:{value:'Male',writable:false,enumerable:true},
			profession:{value:'UserProfession',writable:true,enumerable:true}
		})

		const personClone = {};
		Object.defineProperties(personClone,Object.getOwnPropertyDescriptors(person));
		console.log(Object.keys(personClone))
		//[ 'gender', 'profession' ]


	}

	function GlobalObjectSealing(){
		const blanket = {};

		Object.preventExtensions(blanket);

		Object.seal(blanket);

		Object.freeze(blanket);

		//method for theirs checking

		console.log(Object.isExtensible(blanket));

		console.log(Object.isSealed(blanket));

		console.log(Object.isFrozen(blanket))

	}

	GlobalObjectSealing();
	//Object_defineProperties();
	//notConfigurableProp();
	//OnlyFoReading();
	//sample2();
	//sample1();
	

}

////////////////////////////////////////////////////////////////JUNE 2 2021
const PropertyAccessors = function(){
//https://learn.javascript.ru/property-accessors
console.log(' PropertyAccessors this', this);


	this.getters_and_setters =()=>{

		const obj = {
			name:'ojbName',
			get propName(){
	
			},
			set propName(value){
	
			}
		};
	
		const user = {
			name:'Name1',
			surname:'surname1',
			get fullName(){
				return `${this.name} ${this.surname}`
			},
			set fullName(value){
				[this.name,this.surname] = value.split(' ');
			},
			get salary(){
				return this._salary;
			},
			set salary(value){
				let numValue = Number.parseInt(value);
				if(isNaN(numValue)){
					console.log(value,'is not a number')
					return;
				}
				if(numValue<1000){
					console.log('You have to pay more than', value);
					return;
				}
				this._salary = numValue;
			}
		};
		console.log(user.fullName)
	
		user.fullName = 'Steve Smith';
		console.log(user.fullName);

		user.salary = 'ABOBA';
		console.log(user.salary);

		user.salary = 313;
		console.log(user.salary);

		user.salary = 1244;
		console.log(user.salary);


	}

	this.propertyDescriptors =()=>{
		const user = {
			name:'Name1',
			surname:'surname1',
		}

		Object.defineProperty(user,'fullName',{
			get fullName(){
				return `${this.name} ${this.surname}`;
			},
			set fullName(value){
				[this.name,this.surname] = value.split(' ');
			}
		})

		console.log(Object.keys(user));
	}

	
//inherits this from parent
	this.usingForCompapibility = ()=>{
		

		const User = function(name,birthday){
			console.log('inside this.usingForCompapibility inside this.User \n',this);

			this.name = name;
			this.birthday = birthday;

			Object.defineProperty(this, 'age',{
				get(){
					const year = new Date().getFullYear();
					return year - this.birthday.getFullYear();
				},
				enumerable:true
			})
		}

		//const userOne = new User('User1Name',new Date('12.05.1994'));
		//console.log('userOne age', userOne.age)

		this.UserClass = User;

		console.log('inside this.usingForCompapibility \n',this);
	}


	//this.usingForCompapibility();
	//this.propertyDescriptors();
	//this.getters_and_setters();

}

function createObjOfPropertyAccessors(){

	const objPropAcc = new PropertyAccessors();
	console.log('Object.keys(objPropAcc) ', Object.keys(objPropAcc));
	objPropAcc.usingForCompapibility();
	const user = new objPropAcc.UserClass('User1Name',new Date('12.05.1994'));
	console.log('Object.keys(user) ', Object.keys(user), 'user.age', user.age);
}


function PrototypeInheritance (){

	function objectPrototypes(){
		
		const animal = {
			species:'species1',
			name:'animalName1',
			walk(){
				console.log(`${this.species} can walk`)
				return this;
			}
		}
		//proto is a getter and setter for prototype 
		const rabbit = {
			__proto__:animal,
			jumps:true,
			rabbitSound(){
				console.log('rabbit sound');
			}
		}
		rabbit.eats = function(){
			console.log('rabbit eats this', this);
			return 'eats hay, vegetables, pells';
		}

		try {
			console.log(
				animal.walk(),
				animal.rabbitSound());
		} catch (error) {
			console.log(error.toString())
		}

		try {
			console.log('animal eats ',
				animal.eats(),
			)
		} catch (error) {
			console.log(error.toString())
		}


		console.log(
			rabbit.jumps,rabbit.species,
			rabbit.name,rabbit.walk(),
			rabbit.rabbitSound(),
			'rabbit eats ',
			rabbit.eats());

		const longJumRabbit = {
			__proto__:rabbit,
			jumpLength:100
		}
		console.log(
			longJumRabbit.jumps,
			longJumRabbit.species,
			longJumRabbit.name,
			longJumRabbit.walk(),
			longJumRabbit.jumpLength);

		console.log('Object.keys(longJumRabbit) ',Object.keys(longJumRabbit));
		for(const key in longJumRabbit) console.log('for(const key in longJumpRabbit) ',key);


	}


	function objectProtoTasks(){

		function task1(){

			let animal = {
				// jumps: null
			};

			let rabbit = {
				__proto__: animal,
				jumps: true,
				doJumping(){
					return 'jumping';
				}
			};
			
			console.log('rabbit.jumps ', rabbit.jumps ); // ? (1)
			console.log('animal.jumps', animal.jumps );

			console.log('rabbit.doJumping() ', rabbit.doJumping() );

			//if we try to get the property that obj does not have we get null
			//if we trye to get the method that obj does not have we get typeError

			try {
				console.log('animal.doJumping() ', animal.doJumping() );
			} catch (error) {
				console.log(error.toString())
			}
			

			delete rabbit.jumps;
			console.log('Object.keys(animal)', Object.keys(animal));
			console.log('Object.keys(rabbit)', Object.keys(rabbit));
			for(const key in rabbit) console.log('for(const key in rabbit) ',key);

			console.log( animal.jumps );
			console.log( rabbit.jumps ); // ? (2)
			
			delete animal.jumps;
			
			console.log( rabbit.jumps ); // ? (3)
		}

		function task2_HumsterEating(){

			const hamster = {

			
				eat(food) {
					console.log(food, this);
					//this.stomach = [food];

					this.stomach = [];
					Array.prototype.push.call(this.stomach,food)
				}
			};
			
			const speedy = {

				__proto__: hamster
			};
			
			const lazy = {
				__proto__: hamster
			};
			
			// Этот хомяк нашёл еду
			speedy.eat("apple");
			speedy.eat("hay");
			console.log('speedy.stomach', speedy.stomach ); // apple
			console.log('speedy.stomach', speedy.stomach ); // apple
			
			// У этого хомяка тоже есть еда. Почему? Исправьте
			console.log('lazy.stomach', lazy.stomach ); 

			console.log('Array.prototype ', Array.prototype.toString())
		}


		task2_HumsterEating();
		//task1();

	}

	objectProtoTasks();
	//objectPrototypes();



}


function F_Prototype(){
	function fPrototypeDefaultPropertyConstructor(){
		const animal = {
			species:'species1',
			name:'animalName1',
			walk(){
				return `${this.species} can walk`;
			}
		}

		function Person(name,surname){
			this.name = name;
			this.surname = surname;
		}
		const person1 = new Person('PersonName1','PersonSurName1');

		cl('Person.prototype.constructor==Person',Person.prototype.constructor==Person);
		cl('person1.constructor==Person ',person1.constructor==Person);

		const person2 = new person1.constructor('PersonName2','PersonSurName2');
		cl('person2.constructor===Person ',person2.constructor===Person);

		function Rabbit(name,jumps){

			this.name = name;
			this.jumps = jumps;
		}
		Rabbit.prototype = animal;

		const rabbitObj = new Rabbit('RabbitName1',true);
		console.log
			('rabbitObj.name,rabbitObj.species, rabbitObj.jumps, rabbitObj.walk() \n',
				rabbitObj.name,rabbitObj.species, rabbitObj.jumps, rabbitObj.walk());

		cl('rabbitObj.constructor == Rabbit ', rabbitObj.constructor == Rabbit);
		//false

		const rabbit2 = new rabbitObj.constructor('RabbitName2',true);
		cl('rabbit2.name, rabbit2.jumps ', rabbit2.name, rabbit2.jumps)
		//rabbit2.name, rabbit2.jumps  undefined undefined
	}

	function changingPrototypes(){
		function Rabbit(){};
		Rabbit.prototype = {
			eats:true
		}
		const rabbit = new Rabbit();
		cl('rabbit.eats ', rabbit.eats);

		//0 true

		//1 undefined // X true 
			// Assigning new value to prototype 
			//property affects on [[Prototype]] of the new objects, 
			//but not on [[Prototype]] of already created objects

		//2 false

		//3 null //X true 
			//rabbit does not have property eats but prototype has true
		
		//4 undefined
	}

	function creatingNewObjectsFromPrototype(){
		
		function Person(name,surname){
			this.name = name;
			this.surname = surname;
		}
		const person1 = new Person('PersonName1','PersonSurName1');

		cl('Person.prototype.constructor==Person',Person.prototype.constructor==Person);//true
		cl('Person.constructor==Person',Person.constructor==Person);//false
		cl('person1.constructor==Person ',person1.constructor==Person);//true

		const person2 = new person1.constructor('PersonName2','PersonSurName2');
		cl('person2.constructor===Person ',person2.constructor===Person);

		const creature = {
			alive:true
		}

		Person.prototype = creature;

		try {
			const person3 = new person2.constructor('Person3','PersonSurName3');
			cl('person3.constructor===Person ',person3.constructor===Person);
		} catch (error) {
			cl(error.toString());
		}

		const advancedCreature =  
		{
			...creature, 
			constructor:Person
		};

		Person.prototype = advancedCreature;

		try {
			const person4 = new person2.constructor('Person4','PersonSurName4');
			cl('person4.constructor===Person ',person4.constructor===Person);
		} catch (error) {
			cl(error.toString());
		}




	}

	creatingNewObjectsFromPrototype();
	//fPrototypeDefaultPropertyConstructor();

}

function NativePrototypes(){
	//https://learn.javascript.ru/native-prototypes
	function ObjectPrototype(){
		const obj = {};
		cl('obj.__proto__ ==Object.prototype ',obj.__proto__ ==Object.prototype)
	}


	function OtherMountedPrototypes(){
		const arr = [1,2,3];

		console.log('arr', arr);

		console.log('arr.__proto__ == Array.prototype', 
			arr.__proto__ == Array.prototype)
		console.log('arr.__proto__.__proto__ == Object.prototype', 
			arr.__proto__.__proto__ == Object.prototype)
		
		console.log('arr.__proto__.__proto__.__proto__ == null ', 
			arr.__proto__.__proto__.__proto__ == null);


		function f(){};
		cl('cl.__proto__ == Function.prototype ', cl.__proto__ == Function.prototype)
		cl('cl.prototype == Function.prototype ', 
			cl.prototype == Function.prototype,cl.prototype )
			//false undefined

		cl('cl.__proto__.__proto__ == Object.prototype ', 
			cl.__proto__.__proto__ == Object.prototype)
		
	}

	function Primitives(){
		String.prototype.show = ()=>{
			console.log(this);
		}
		'SHow me'.show();

		String.prototype.show = function(){
			console.log(this);
		}
		'SHow me'.show();

	}

	function ChangingPrototypes(){

		if(!String.prototype.myRepeat){
			String.prototype.myRepeat = function(n){
				return new Array(n+1).join(`${this} this is my words `);
			}
		}

		console.log('text'.myRepeat(5));

	}

	function BorrowFromPrototypes(){

		const obj = {
			0:'first property',
			1:'second property',			
		}

		cl('Object.keys(obj)', Object.keys(obj));
		cl('(Object.keys(obj).length) ', (Object.keys(obj).length) );
		
		
		// cl('Object.prototype ', Object.prototype );
		// cl('Object.keys(Object.prototype) ',Object.keys(Object.prototype));
		// cl('Object.keys(Object) ',Object.keys(Object));
		// for(const key in Object){
		// 	console.log('Object key', key);
		// }


		// for(const key in obj){
		// 	if(Object.prototype.hasOwnProperty.call(obj,key)){
		// 		console.log(key);
		// 	}
		// }


		Object.defineProperty(obj,'length',{
			get(){
				return Object.keys(obj).length
			},enumerable:false
		})

		cl('obj.length ', obj.length);

		obj.join = Array.prototype.join;

		cl('obj.join(" ABOBA ") ',obj.join(' ABOBA '));

		const newObj = {
			0:'a prop',
			1:'b arg',
			length:2
		}
		newObj.__proto__ = Array.prototype;

		cl('newObj.join(" ABOBA ") ', newObj.join(' ABOBA '));
	
	}


	function Tasks(){

		function task1(){
			function f(msg){
				cl(msg)
			}

			

			function partial(fn){

				return function(ms,...args){

					const id = setTimeout(()=>{
						console.log('this inside partial inside function inside setTimeout ', this);

						fn.call(this,...args);
						clearTimeout(id);
					},ms)

				}
			}

			f.prototype.defer = partial(f)

			const fObj = new f('MyMessage');
			fObj.defer(1000,'MY message');

			//f.defer(1000,'MY message');

		}

		function task1Common(){
			Function.prototype.defer = function(ms){
				const id = setTimeout(this,ms);

			}
			function f(){
				console.log('msg');
			}
			f.defer(1000);
		}

		function task2(){
			Function.prototype.defer = function(ms){
				const f = this;//if we save this to variable we can call it leter
				return function(...args){
					setTimeout(()=>{
						//[Function: f]
						cl('Function.prototype.defer function(...args) setTimeout(() this', f);
						f.call(null,...args);
					},ms)
				}
			}
			function f(a,b){
				cl(a+b);
			}
			f.defer(500)(2,4);

		}
		
		task2();
		//task1Common();
		//task1();


	}

	Tasks();
	//BorrowFromPrototypes();
	//ChangingPrototypes();
	//Primitives();
	//OtherMountedPrototypes();
	//ObjectPrototype();
}

////////////////////////////////////////////////////////////////JUNE 3 2021
function PrototypeMethods(){

	function ShortStorySimpleObject(){

		function Person(data){
			this.data = data;
		}
		const person = new Person('My data');

		const obj = {
			myProp1:'first property',
			myProp2:'second property',			
		}

		const objNew = Object.create(obj);

		console.log('objNew.myProp1 ', objNew.myProp1);//first property
		cl('Object.getPrototypeOf(obj)==objNew.prototype ',
			Object.getPrototypeOf(objNew)==obj)//true
		cl('obj.__proto__ ', obj.__proto__);//{}
		cl('obj.prototype=={} ', obj.prototype==undefined);//true

		cl('Person.prototype ', Person.prototype)//{}
		cl('Person.__proto__ ', Person.__proto__)//[Function]
		cl('person.prototype ', person.prototype)//undefined
		cl('person.__proto__ ', person.__proto__)//Person {}

		Person.prototype = Function.prototype;
		cl('Person.prototype = Function.prototype')
		

		cl('Person.prototype ', Person.prototype)//[Function]
		cl('Person.__proto__ ', Person.__proto__)//[Function]
		cl('person.prototype ', person.prototype)//undefined
		cl('person.__proto__ ', person.__proto__)//Person {}
		cl('Object.getPrototypeOf(person) ',Object.getPrototypeOf(person))

		const newPerson = new Person('data of new person');
		console.log(`const newPerson = new Person('data of new person');`)
		cl('newPerson.prototype ', newPerson.prototype)//undefined //can be applied only to function constructor
		cl('newPerson.__proto__ ', newPerson.__proto__)//Person {}
		cl('Object.getPrototypeOf(newPerson)',Object.getPrototypeOf(newPerson))//[Function]

		const dummy = {
			congig:'No data',
			__proto__:newPerson
		};
		cl('Object.getPrototypeOf(dummy)',Object.getPrototypeOf(dummy))

		Object.setPrototypeOf(dummy,{});
		cl('Object.setPrototypeOf(dummy,{}); ')

		cl('Object.getPrototypeOf(dummy)',Object.getPrototypeOf(dummy));

		const worker = Object.create(person,{
			job:{value:'driver',enumerable:true}
		});

		cl('worker.job ', worker.job);

		const deepWorkerClone = Object.create(
			worker,
			Object.getOwnPropertyDescriptor(worker));
		
		cl('deepWorkerClone.job ', deepWorkerClone.job ,
			'Object.getPrototypeOf(deepWorkerClone)', 
				Object.getPrototypeOf(deepWorkerClone));
		
		//Свойство __proto__ особенное: оно должно быть либо объектом, 
		//либо null, а строка не может стать прототипом.
		//Свойство __proto__ – не обычное, а аксессор, заданный в Object.prototype
		//obj.__proto__ вызывается соответствующий геттер/сеттер из прототипа obj, 
		//и именно он устанавливает/получает свойство [[Prototype]]
		//__proto__ – это способ доступа к свойству [[Prototype]], 
		//это не само свойство [[Prototype]]

	}

	function createAssociationArray(){
		const obj = Object.create(null);
		obj['_21'] = 'My data of key';
		obj['_22'] = 'My data of key next';
		cl(`obj['_21'] `, obj['_21']);

		//Обратите внимание, что большая часть методов, связанных с объектами, 
		//имеют вид Object.something(...). К примеру, Object.keys(obj). 
		//Подобные методы не находятся в прототипе, так что они продолжат 
		//работать для таких объектов:

		cl('Object.keys(obj)', Object.keys(obj));
	}

	function Tasks(){

		this.addStringToDictionary = function(){


			const dictionary = Object.create(null,{
				toString:{ //define toString property
					value(){ // value is a function
						return Object.keys(this).join();
					}
				}
			});

			

			// Object.defineProperty(dictionary,'toString',{
			// 	get(){
			// 		return Object.keys(dictionary).join(',')
			// 	},enumerable:false,
			// 	configurable:false
			// })

			dictionary.multiply = function(a,b){
				const nA = Number.parseInt(a);
				const nB = Number.parseInt(b);
				if(!isNaN(nA)&&!isNaN(nB)){
					return nA*nB
				}
				return 0;
			}

			dictionary.pear = "Pear";
			dictionary.apricot = "Apricot";
			dictionary.__proto__ = "__proto__ value set";

			for(const key in dictionary) cl(key);
			cl(' dictionary.toString ', dictionary.toString());
			
			cl('Object.keys(dictionary) ', Object.keys(dictionary).join(','));
			cl('dictionary.prototype ',dictionary.prototype)
			cl('dictionary.__proto__ ',dictionary.__proto__)
			cl('Object.getPrototypeOf(dictionary)',Object.getPrototypeOf(dictionary))
			cl('Object.entries(dictionary) ',Object.entries(dictionary));

			function addTrackedMethod(obj){
				for(const [methodName, method] of 
					Object.entries(obj).filter(([,method])=>typeof method ==='function')){
						obj[methodName] = function InterseptedMethod(...args){
							const result = method.call(obj,...args);
							console.log('methodName ',`${methodName}`, args.join(", "), '=', `${result}`);
							return result
						};
					}
			}

			addTrackedMethod(dictionary);
			console.log('dictionary', dictionary);
			dictionary.multiply(2,5);

		}


	}


	function doAllCallsDoTheSame(){

		function User(emai,password){
			this.emai = emai;
			this.password = password;
		}
		User.prototype.getCredentials = function(...args){
			if(args.includes('phrase'))
				return `email: ${this.emai} \n password: ${this.password}`;
			return 'empty data';
		}
		User.prototype.logAfterSomeTimeBuilder = function(ms){
			return function(...args){
				setInterval(()=>{
					console.log('this args',this,...args);
				},ms)
			}
		}
		const user = new User('y_22@domain.com','33N__21vCNN');
		cl(`user.getCredentials('phrase') `,user.getCredentials('phrase'));
		cl(`user.__proto__.getCredentials('phrase') `,user.__proto__.getCredentials('phrase'));
		cl('User.prototype', User.prototype);
		cl('User.prototype.prototype', User.prototype.prototype);
		cl('user.getCredentials.prototype', user.getCredentials.prototype)
		cl('user.__proto__ ',user.__proto__)
		cl('user.__proto__.__proto__ ',user.__proto__.__proto__);

		cl('user.logAfterSomeTimeBuilder.prototype', user.logAfterSomeTimeBuilder.prototype)


		const user2 = {
			emai:'AFF',
			password:'$23ggg',
			__proto__:user
		};
		cl(`user2.getCredentials('phrase') `,user2.getCredentials('phrase'));




	}

	doAllCallsDoTheSame();

	// const t = new Tasks();
	// t.addStringToDictionary();

	//createAssociationArray();
	//ShortStorySimpleObject();
	
}




(function Main(){



	PrototypeMethods();

	//NativePrototypes();

	//F_Prototype()
	//PrototypeInheritance();

	//createObjOfPropertyAccessors();

	//flagsAndDescriptors();
	
	//lambdaFuncs();


	//DecoratorTest();

	//testClosure()
	//RecursionTest();
})();


module.exports.PropertyAccessors = PropertyAccessors;

