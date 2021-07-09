'use strict';

function heavyExecution(){
	console.log('heavy execution from script.js ');
}

function promiseTasks(){
	function taks1(){
		const promise = new Promise((resolve,reject)=>{
			resolve(1);
			setTimeout(()=>resolve(2),1000);
		})
		promise
		.then(result=>console.log(result))
		.then(result=>console.log(result));
	}
	function taks2(){
		const alert = console.log;
	
		function delay(ms) {
			return new Promise((resolve,reject)=>{
				setTimeout(()=>{
					resolve('result');
				},ms)
			})
		}
		
		delay(3000).then((result) => alert('выполнилось через 3 секунды ',result));
	}

	function task3(){

		new Promise(function(resolve, reject) {
			setTimeout(() => {
				// reject( 
					new Error("Whoops!") 
				// );
			}, 1000);
		}).catch(err=>{
			console.log('Error block');
			console.log(err.message)
		});
	}

	task3();
	// taks2();
	//taks1();

}


(function main(){

	promiseTasks();

})();