
//https://zellwk.com/blog/async-await-in-loops/

async function exampleDataProcessing (){

	const fruitBasket = {
		apple:27,
		grape:0,
		pear:14
	}

	const sleep = (ms) => {
		return new Promise(resolve=>setTimeout(resolve,ms));
	}

	const getNumFruit = async (fruit) => {
		return sleep(1000).then(r=>fruitBasket[fruit])
	}

	const arrNames = ['apple','grape','pear'];

	const getFuitsFromServerSequently = async () =>{
		const numApples = await getNumFruit('apple')
		// .then(num=>console.log(num));
		console.log(numApples);
	
		const numGrapes = await getNumFruit('grape')
		// .then(num=>console.log(num));
		console.log(numGrapes);
	
		const numPears = await getNumFruit('pear')
		// .then(num=>console.log(num));
		console.log(numPears);
	}

	const mapArryOfNamesToPromises = async () => {

		const arrNames = ['apple','grape','pear'];
		const allPromises = arrNames.map(async (name)=>{
			const num = await getNumFruit(name);
			console.log(num);
			return num;
		})
	
		const arrayResult = await Promise.all(allPromises);
		// .then(res=>{
		// 	console.log('all promise finished');
		// 	console.log(res);
		// })
		console.log('all promise finished');
		console.log(arrayResult);

	}


	const filterResultsWithPromises = async () => {

		const arryOfFuitsWithQuantityMoteThan20 = await arrNames.filter(async (key) =>{
			const num = await getNumFruit(key);
			console.log(num);
			return num>20;
		})
		const resultArr = await Promise.all(arryOfFuitsWithQuantityMoteThan20);
		console.log('all promises are finished');
		console.log(resultArr);
	}

	const reduceSumByFirstResolvingPromiseQuantity = async () => {

		const allPromises = arrNames.map(async (name)=>{
			const num = await getNumFruit(name);
			console.log('got num from promise', num);
			return num;
		})
	
		const arrayResult = await Promise.all(allPromises);

		const sum = arrayResult.reduce(  (sum, num)=>{

			console.log('num ',num);
			return sum + num;
		},0);
		console.log('final sum ', sum);
	}

	const reduceSumEveryQuantity = async () => {

		const sum = await arrNames.reduce( async (promisedSum, fruit)=>{
			const num = await getNumFruit(fruit);
			const sum  = await promisedSum;
			console.log('got num from promise', num);
			return sum + num;
		}, Promise.resolve(0));

		console.log('final sum ', sum);
	}

	await reduceSumEveryQuantity();
	// await reduceSumByFirstResolvingPromiseQuantity();
	// await filterResultsWithPromises();
	// await mapArryOfNamesToPromises();
	// await getFuitsFromServerSequently();



	

}


(function main(){


	exampleDataProcessing();


})();