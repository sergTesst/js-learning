

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


(function Main(){

	DecoratorTest();

	//testClosure()
	//RecursionTest();
})();