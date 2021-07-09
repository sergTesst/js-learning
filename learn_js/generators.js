

function functionGenerator(){
	function loopThroughGenerator(){
		function* generateSequesnce(){
			yield 1;
			yield 2;
			yield 'text';
			yield {foo:'val'};
			yield Promise.resolve(3);
			return 'last';
		}
		const sequece = generateSequesnce();
		console.log([0,...sequece]);
	
		console.log('sequece.next() result ',sequece.next())
		for(value of sequece){
			console.log('value from loop ',value);
		}
	
	}
	function usingGeneratorsForObjectsIteration(){
		const range = {
			from:0,
			to:5,
			[Symbol.iterator](){
				return {
					current:this.from,
					last:this.to,
					next(){
						if(this.current<=this.last){
							return {done:false,value:this.current++}
						}else{
							return {done:true};
						}
					}
				}
			}
		}

		const rangeGenerator = {
			from:0,
			to:5,
			*[Symbol.iterator](){
					for(let val = this.from;val<=this.to;val++){
						yield val;
					}
				}
			//infinite loop
			// async *[Symbol.iterator](){
			// 	for(let val = this.from;val<=this.to;val++){
			// 		await setTimeout(()=>{ Promise.resolve(1)},500)
			// 		yield val;
			// 	}
			// }
		}

		console.log('range object spread operator into array \n',[...range])
		console.log('ragngeGenerator \n',[...rangeGenerator]);

	}
	function randomInt(min,max){
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random()*(max-min))+min;
	}

	function compositionOfGenerators(){


		function* generateSequense(start, end){
			for(let i = start;i<=end;i++) yield randomInt(start,end);
		}
		function* generatePasswordCodes(){
			yield* generateSequense(0,150);
			yield* generateSequense(0,200);
			yield* generateSequense(0,200);
		}
		let password = '';
		for(let val of generatePasswordCodes()){
			password+=String.fromCharCode(val);
		}
		console.log(password);
	}


	function twoWayOfGenerators(){
		function* gen(){
			const res = yield 'text';
			console.log(res);
		}
		const generator = gen();
		const resultOfGenerator = generator.next().value;
		console.log(resultOfGenerator);
		generator.next('some value');
		setTimeout(()=>{generator.next(6)},300);
		setTimeout(()=>{generator.next('timeed out text')},300);
	}

	function twoWayOfGeneratorsSecond(){
		function* gen() {
			let textFirst = yield "text first";
		
			console.log('textFirst ',textFirst);//passed second value
		
			let textSecond = yield "text second";
		
			console.log('textSecond ',textSecond);//passed third value
		}
		
		let generator = gen();
		
		console.log('generator.next().value ', 
			generator.next().value );// text first 
		
		console.log('generator.next(4).value ', 
			generator.next('passed second value').value );// text second 
		
		console.log('generator.next(9).value ', 
			generator.next('passed third value').done ); 
	}


	function errorHandlingInGenerators(){

		function* genBuilder(){
			try {
				const result = yield 'some text';
				console.log('genBuilder unrechable code');
			} catch (error) {
				console.log('catch error.message', error.message)
			}
		}
		const gen = genBuilder();
		
		const res = gen.next().value;
		console.log('res', res);

		gen.throw(new Error('Error message'));
	}

	function tasks(){
		function taks1(){
			
			function PseudoRandomBuilder(num){
				this.previous = num;
				this.gen = function(){
					const next = this.previous * 16807 % 2147483647;
					this.previous = next;
					return this.previous;							
				}

			}
			const pseudoRandomObj = new PseudoRandomBuilder(1);
			console.log(pseudoRandomObj.gen())
			console.log(pseudoRandomObj.gen())
			console.log(pseudoRandomObj.gen())
			console.log(pseudoRandomObj.gen())


			function* pseudoRandom(seed){
				let num = seed;
				const generate = num => num * 16807 % 2147483647;
				while(true){
					num = generate(num)
					yield num;
				}
			}

			const res = pseudoRandom(1);
			console.log(res.next());
			console.log(res.next());
			console.log(res.next());
			console.log(res.next());

			// console.log(gen.next().value)
			// console.log(gen.next().value)
			// console.log(gen.next().value)

		}
		taks1();
	}

	tasks();
	// errorHandlingInGenerators();
	//twoWayOfGeneratorsSecond();
	// twoWayOfGenerators();
	// compositionOfGenerators();
	//usingGeneratorsForObjectsIteration();
	// loopThroughGenerator();
	
}

function asyncIterators(){

	function asyncRangeiteration(){

		const asyncRange = {
			from:0,
			to:5,
			[Symbol.asyncIterator](){
				return {
					current:this.from,
					last:this.to,

					async next(){
						await new Promise(resolve=>setTimeout(resolve,1000));

						if(this.current<=this.last){
							return {done:false,value:this.current++}
						}else{
							return {done:true};
						}
					}
				};//Important semicolon here
			}
		};

		(async()=>{
			for await (let val of asyncRange){
				console.log('val from async range ', val);
			}
		})();

	}

	function asyncGenerators(){
		async function* generateSequence(start,end){
			for (let i = start;i<=end;i++){
				await new Promise(resolve=>setTimeout(resolve,1000));
				yield i;
			}
		}
		(async ()=>{
			const gen = generateSequence(0,10);
			console.log(await gen.next());
			for await (let val of gen){
				console.log('value from async generator', val);
			}
		})();

	}

	function asyncIteratingObjects(){
		const rangeGenerator = {
			from:0,
			to:5,
			async *[Symbol.asyncIterator](){
				for(let val = this.from;val<=this.to;val++){
					await new Promise(resolve=>setTimeout(resolve,1000));
					yield val;
				}
			}
		};//Important semicolon

		(async ()=>{

			for await (let val of rangeGenerator){
				console.log('value from async generator object', val);
			}
		})();

	}

	asyncIteratingObjects();
	// asyncGenerators();
	// asyncRangeiteration();


}



(function main(){

	asyncIterators();
	// functionGenerator();

})();



