const { result } = require('lodash');
const fetch = require('node-fetch');

const process = require('process');
const fs = require('fs')



function promiseStaticMethods(){

	function PromiseAllNumbers(){
		Promise.all([
			new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
			new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
			new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
		]).then(console.log); 
		// когда все промисы выполнятся, результат будет [1,2,3]
		// каждый промис даёт элемент массива
	
	}
	function promiseAllUsers(){
		const gitHubApi = 'https://api.github.com/users';

		const usersNames = [
			'mojombo',
			'defunkt',
			'non-existing-user',
			'pjhyett',
			'https://no-such-url'
		]

		// fetch('https://api.github.com/users/github')
    // .then(res => res.json())
    // .then(json => console.log(json));

		const usersPromises = usersNames.map(uN=>{
			const link = `${gitHubApi}/${uN}`;
			// console.log(link);

			//personal access token: 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
			const pa_token = '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';
			return fetch(link,{method:'GET',headers:{username:pa_token}})
		});

		//console.log(usersPromises);

		function promiseAllForUsers(usersPromises){
			try {
	
				Promise.all(usersPromises)
				.then((responses) =>{
					Array.from(responses).forEach(res=>{
						console.log(`url: ${res.url}; \n status :${res.status} ${typeof res.status} \n`);
					})
					responses = responses.filter((r)=>{
						const res = r.status == 200;
						console.log(r.status, typeof r.status, res);
						return res;
					});
					return responses;
				})
				.then(
					(responses)=>Promise.all(
						responses.map((r)=>{
							console.log('r', r);
							return r.json()
						})
					)).then(users=>{
						users.forEach(u=>{
							console.log(`login: ${u.login} \n avatartUrl: ${u.avatar_url}`)
					})
				})
				
			} catch (error) {
				console.log(error.message);
			}

		}

		function promiseAllSettled(usersPromises){

			Promise.allSettled(usersPromises)
			.then((results) =>{
				Array.from(results).forEach((res, num)=>{

					if(res.status=="fulfilled" && res.value.status === 200){
						console.log(`num: ${usersNames[num]}; res.value.status :${res.value.status}; res.status ${res.status}`);
					}
					if(res.status=="rejected" || res.value.status === 404 ){
						console.log(`num: ${usersNames[num]}, reason : ${res.reason} `);
					}
				})
				
				return results;
			})
			.then(
				(responses)=>{
					console.log('responses', responses);
					return Promise.all(
						responses.map(r=>{
							console.log('r', r);
							return r.value.json();
						})
					)
				}
			).then(users=>{
				users.forEach(u=>{
					console.log(`login: ${u.login}; \n avatartUrl: ${u.avatar_url}`)
				})
			})

		}

		function sampleFromBookPromiseAllSettled(){

			let urls = [
				'https://api.github.com/users/iliakan',
				'https://api.github.com/users/remy',
				'https://no-such-url'
			];
			
			Promise.allSettled(urls.map(url => fetch(url)))
				.then(results => { // (*)
					results.forEach((result, num) => {
						if (result.status == "fulfilled") {
							console.log(`${urls[num]}: ${result.value.status}`);
						}
						if (result.status == "rejected") {
							console.log(`${urls[num]}: ${result.reason}`);
						}
					});
				});

		}

		function promiseSettledPolyfil(){
			
			if(!Promise.allSettled) {
				Promise.allSettled = function(promises) {
					return Promise.all(
						promises.map(p => 
							Promise.resolve(p)
								.then(
									value => ({
										status: 'fulfilled',
										value: value
									}), 
									error => ({
										status: 'rejected',
										reason: error
									})
								)
							)	
						);
				};
			}

		}

		function promiseRace(){
			const alert = console.log;
			Promise.race([
				new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
				new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ошибка!")), 2000)),
				new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
			]).then(alert); 
			// returns 1, but executes all

		}

		function cachingWithPromise(){
			const cache = new Map();
			function loadCached(url){
				if(cache.has(url)){
					return Promise.resolve(cache.get(url))
				}
				fetch(url)
				.then(response=> response.text())
				.then((text)=>{
					cache.set(url,text);
					return text;
				})
			}
			//Promise.reject(data) 
		}

		// promiseRace();
		
		// promiseSettledPolyfil();

		promiseAllSettled(usersPromises);

		// promiseAllForUsers(usersPromises);
		
		// sampleFromBookPromiseAllSettled();

	}

	function promiseAllError(){
		Promise.all([
			new Promise((resolve, reject) => setTimeout(
				() => resolve(1), 1000)),
			new Promise((resolve, reject) => setTimeout(
				() => reject(new Error("Error!")), 2000)),
			new Promise((resolve, reject) => setTimeout(
				() => resolve(3), 3000))
		]).catch(err => console.log(err.message)); 

	}


	promiseAllUsers();

	// promiseAllError();
	// PromiseAllNumbers();

}

function promisificationForFunctions(){

	function promisify(){
		//code from callbacks_files helpers.js
	}

}

function microTasks(){
	function executionOfPromise(){
		const resolvedPromise = Promise.resolve(1);
		resolvedPromise.then((result)=>{console.log(`resolved ${result}`)});

		console.log('code after promise');
	}


	function unhandledErrors(){
		const alert = console.log;

		let promise = Promise.reject(new Error("Ошибка в промисе!"));
		setTimeout(()=>{
			promise.catch(err => {
				console.log('promise catch block');
				alert('поймана!')
			});

		});

		process.on('uncaughtException', (err, origin) => {
			fs.writeSync(
				process.stderr.fd,
				`Caught exception: ${err}\n` +
				`Exception origin: ${origin}`
			);
		});

	}

	function tasks(){
		function task1(){

			async function wait() {
				await new Promise(resolve => setTimeout(resolve, 1000));
			
				return 10;
			}
			
			async function f() {
				// ...что здесь написать?
				// чтобы вызвать wait() и дождаться результата "10" от async–функции
				// не забывайте, здесь нельзя использовать "await"
				// wait().then(res=>console.log(res));
				// await wait();
			}
			f();
		}
		task1();
	}

	tasks();
	// unhandledErrors();
	// executionOfPromise();
}



(function main(){

	microTasks();
	//promiseStaticMethods();

})();