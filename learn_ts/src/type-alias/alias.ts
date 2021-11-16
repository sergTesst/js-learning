
// add to typescript handbook
// height: 400px;
// overflow-y: scroll;


const sanitize = (...args: any):any[] => args;

type ID = number | string;

type UserInputSanitizedString = string;

function sanitizeInput(str: string) :UserInputSanitizedString {
	return sanitize(str).join(' ');
}


// literal types


let x : "hello" = "hello";

x = 'hello';

// x = 'nothelloerror'

//Return type inferred as number[] | string;

function getFirstThree(x: number[] | string){
	return x.slice(0,3);
}


// literal types

const req = {url: 'https://example.com', method: 'GET' as "GET"};

// strictNullChecks on

function doSomething(x:string | null){
	if(x === null){

	}else{
		console.log('hello ' + x.toUpperCase());
	}
}

//non-null asserting operator (postfix !)

function liveDangerously(x?:number | null){
	console.log(x!.toFixed());
}	

// less common primitives

const oneHundred: bigint = 100n;

const firstName = Symbol('name');
const secondName = Symbol('name');

// if(firstName == secondName)  -> error