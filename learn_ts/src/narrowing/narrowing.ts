//run command tsc && node ./dist/narrowing.js

function padLeft(padding: number | string, input: string):string {
	if(typeof padding === 'number')
		return new Array(padding+1).join(' ') + input;
	return padding + input;
}
const padLeftRes = padLeft(1,'21');
console.log(`padLeftRes `, padLeftRes);