'use strict';

function addNumbers(prev,curr){
	console.log({prev,curr});
	return prev+curr
}

const arr = [2,3,1,55,12];
function reduceArr(arr,initialState){
	
	return arr.reduce(addNumbers,initialState);
}
console.log('result: ',reduceArr(arr,4));


