
'use strict'

const cl = console.log


//in classes all method are saved in F.prototype

//Во-первых, функция, созданная с помощью class, помечена специальным внутренним свойством [[FunctionKind]]:"classConstructor"
//User(); // Error: Class constructor User cannot be invoked without 'new'

function classTasks(){

	function rewriteClockFromFuncStyle(){

		class Clock{
			constructor(){

				setInterval(()=>{
					const date = new Date();
					let dateY = date.getFullYear();
					let dateM = date.getMonth();
					let dateD = date.getDay();
					let dateH = date.getHours();
					let dateMin = date.getMinutes();
					let dateS = date.getSeconds();

					console.log(`year ${dateY}, month ${dateM}, day ${dateD} hours ${dateH} minutes ${dateMin} seconds ${dateS}`)
				},1000)
			}
		}

		new Clock();

	}

	rewriteClockFromFuncStyle();

}

	function Classes(){
		
		function MaximumCallStackExceeded(){

			function logCallerMethod(obj){
				for(const [methodName,method] of 
					Object.entries(obj).filter(([,method])=> typeof method === 'function')){
						obj[methodName] = function(...args){
							cl(` method name is '${methodName}'`);
							cl(` THIS is`, this);
							cl(` OBJ is`, obj);
							cl(` this.__proto__ is`, this.__proto__);
							cl(` obj.__proto__ is`, obj.__proto__);

							const result = method.call(this,...args);
							if(typeof result !== 'function' && typeof result !== 'undefined'){
								cl('typeof result ',typeof result)
								cl(` ${methodName} `,`(${args}) = ${result}`);
							}
							return result;
						}
					}
			}

			


			const animal = {
				name:'animal',
				go(){
					cl(this.name, ' going somewhere')
				},
				jump(){
					cl(this.name, 'can jump')
				},
				eat(){
					cl(this.name, ' can eat')
				}

			}

			const bird = {
				__proto__:animal,
				name:'bird',
				go(){

					this.__proto__.go()
				},
				jump(){
					this.__proto__.jump.call(this);
				},
				eat(){
					//[[HomeObject]]
					super.eat();
				}

			}

			const eagle = {
				__proto__:bird,
				name:'eagle',
				go(){
					this.__proto__.go()
				},
				jump(){
					this.__proto__.jump.call(this);
				},
				eat(){
					//[[HomeObject]]
					super.eat();
				}

			}

			//cl('Object.entries(animal) ', Object.entries(animal));
			logCallerMethod(animal)
			logCallerMethod(bird)
			logCallerMethod(eagle)

			//animal.go();
			//bird.go();
			//bird.jump();
			//bird.eat();
			//eagle.go();
			//eagle.jump();
			eagle.eat();

		}

		function commonMaximumCSE(){
			let animal = {
				name: "Animal",
				eat() {
					console.log(`${this.name} ест.`);
				}
			};
			
			let rabbit = {
				__proto__: animal,
				name: "Кролик",
				eat() {
					// вот как предположительно может работать super.eat()
					this.__proto__.eat.call(this); // (*)
				}
			};
			
			rabbit.eat(); // Кролик ест.
		}

		//commonMaximumCSE();
		MaximumCallStackExceeded();

	}
	function ClassesInstanceOf(){
		function operatorInstanceOf(){

			class Person {
				constructor(alive, name){
					this.alive = alive;
					this.name = name;
				}
				static [Symbol.hasInstance](obj){
					return obj.alive?true:false;
				}
			}
			
			class Manager extends Person {
				constructor(alive, name, team){
					super(alive, name);
					this.team = team;
				}
			}
			
			class Employee extends Person{
				constructor(...args){
					super(...args);
					console.log(args);
				}
			
			}
			
			const emp = new Employee(true, 'first','second');

			const per = new Person(true, 'foo');
			const manag = new Manager(true, 'foo','bar');

			console.log('manag instanceof Person ',manag instanceof Person)
			console.log('per instanceof Manager ',per instanceof Manager)
			console.log('emp instanceof Manager ',emp instanceof Manager)

			const person = {alive:true};
			console.log('person instanceof Person ', person instanceof Person);
			

		}

		function ObjectPrototypeToStringReturnsType(){
			const objectToString = Object.prototype.toString;
			const gt = (obj) => objectToString.call(obj);
			const obj = {};
			
			console.log(gt(obj));
			const arr = [];
			console.log(gt(arr));

			class Person extends Object {
				constructor(){
					super()
				}
			};
			const p = new Person();
			console.log('gt(p) ',gt(p));
			console.log('typeof p ',typeof p);
			console.log('p instanceof Person ',p instanceof Person);
			
			const typeObj = {
				[Symbol.toStringTag]:"TypeA"
			}
			console.log('{}.toString.call(typeObj) ',{}.toString.call(typeObj))
			const objInstance = new Object();
			console.log(p.isPrototypeOf(objInstance));

			console.log('Person.prototype ',Person.prototype);
			console.log('Person.prototype.prototype ',Person.prototype.prototype);

			console.log('Person.__proto__ ',Person.__proto__);
			console.log('Person.__proto__ == Object',Person.__proto__ == Object);
			console.log('Person.__proto__.__proto__',Person.__proto__.__proto__);

			console.log('Person.__proto__.__proto__ == Object.prototype',
				Person.__proto__.__proto__ == Object.prototype);

			console.log('Person.__proto__.__proto__ == Object.__proto__',
				Person.__proto__.__proto__ == Object.__proto__);

			console.log('Person.__proto__.__proto__==Function.prototype',
				Person.__proto__.__proto__==Function.prototype);

			console.log('Person.__proto__.__proto__.__proto__',
				Person.__proto__.__proto__.__proto__);
				console.log('Person.__proto__.__proto__.__proto__.__proto___',
				Person.__proto__.__proto__.__proto__.__proto___);
			console.log('Person.__proto__.prototype',Person.__proto__.prototype);

			console.log('p.__proto__ ',p.__proto__)
			console.log('p.prototype', p.prototype)
		}
		ObjectPrototypeToStringReturnsType();

		//operatorInstanceOf();

	}

	function StaticPropertiesMethods(){
		
		function articlesSorting(){

			class Article{
				constructor(title,date){
					this.title = title;
					this.date = date;
				}

				static compare(a,b){
					return b.date - a.date;
				}
				static articleBuilder(title,date) {
					if(!title&!date)
						return new this("Today's digest", new Date());

					return new this(title,date);
				}
			}
			const articles = [
				new Article('RxJs',new Date(2020,3,14)),
				new Article('NgRx',new Date(2019,7,27)),
				new Article('Redux',new Date(2020,7,13)),
				new Article('React',new Date(2021,3,24))
			]

			articles.sort(Article.compare)
			console.log(articles);


			console.log(Article.articleBuilder());

		}
		function inheritanceOfStaticPropsAndMethods(){

			class Animal {

				constructor(name, speed) {
					this.speed = speed;
					this.name = name;
				}
			
				run(speed = 0) {
					this.speed += speed;
					alert(`${this.name} runs with speed ${this.speed}.`);
				}
			
				static compare(animalA, animalB) {
					return animalB.speed - animalA.speed;
				}
			
			}
			
			class Rabbit extends Animal {
				constructor(...args){
					super(...args);
				}
				hide() {
					console.log(`${this.name} hides!`);
				}
			}
			
			const rabbits = [
				new Rabbit("White rabbit", 10),
				new Rabbit("Black rabbit", 5),
				new Rabbit("Brown rabbit", 7)
			];
			
			rabbits.sort(Rabbit.compare);
			
			console.log(rabbits)
			console.log('Rabbit.__proto__ == Animal',Rabbit.__proto__ == Animal);
			console.log('Rabbit.prototype.__proto__ == Animal',Rabbit.prototype.__proto__ == Animal.prototype);


		}

		function task1(){
			class Rabbit extends Object {
				constructor(name) {
					super();
					this.name = name;
				}
			}
			
			let rabbit = new Rabbit("Кроль");
			
			console.log( rabbit.hasOwnProperty('name') );


		}

		task1();
		//inheritanceOfStaticPropsAndMethods();
		// articlesSorting();
	}


	function Mixin(){
		function MixinSample(){

			const greetingMixin = {
				hi(msg){
					this.say('hello',msg);
				},
				say(text,msg){
					console.log(`${text}, ${this.name} ${msg?msg:''}`);
				},
				bye(msg){
					this.say('bye',msg);
				}
			}
			class Person {
				constructor(name) {
					this.name = name;
				}
			}

			const talkingMixin = {
				__proto__:greetingMixin,
				talk(msg, sentence){
					super.hi(msg);
					console.log(sentence);
				},
				hi(msg){
					super.hi(msg);
				},
				say(text,msg){
					super.say(text,msg);
				}
				,
				bye(msg){
					super.bye(msg);
				}
			}

			Object.assign(Person.prototype,talkingMixin);
			const p = new Person('Name');
			p.hi();
			p.bye();
			p.talk('secret msg', 'the topic is');

		}
		
		function EventMixitRuns(){
			const eventMixin = {
				/**
				 * Subscribe on event, use case:
				 * menu.on('select, function(item) { ... }')
				 */
				on(eventName, handler){
					if(!this._eventHandlers){
						this._eventHandlers = {}
					}
					if(!this._eventHandlers[eventName]){
						//? assigning empty arr
						this._eventHandlers[eventName] = [];
					}
					this._eventHandlers[eventName].push(handler);
				},
				/**
				 * cancel subsription, use case:
				 * menu.off('select', handler)
				 */
				exists(eventName){
					if( !this._eventHandlers || !this._eventHandlers[eventName])
						return false;
					return true;
				}
				,
				off(eventName,handler){
					if( !this.exists(eventName) )
						return;
					this._eventHandlers = [].filter.call(this._eventHandlers, h=>h!=handler);
				},
				/**
				 * Generate event with a given name and data
				 * this.trigger('select', data1, data2)
				 */
				trigger(eventName,...args){
					if( !this.exists(eventName) )
						return;
					Array.from(this._eventHandlers[eventName]).forEach(handler=>{
						handler.call(this,...args);
					})
				}
			}
			class Menu{
				constructor(name){
					this.name = name;
				}
				choose(value){
					this.trigger('select', value);
				}
			}
			
			Object.assign(Menu.prototype,eventMixin);

			const menu = new Menu('computers');
			menu.on('select',value=>
				console.log(`Choosen values is ${value}`));
			menu.choose('lenovo');
		}

		EventMixitRuns();
		// MixinSample();
	}

	

(function Main(){

	Mixin();
	//ClassesInstanceOf();
	
	
	//StaticPropertiesMethods();
	
	//Classes();
	//classTasks();
})();