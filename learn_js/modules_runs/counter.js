

export function counter(defaultVal){
	let counter = defaultVal?defaultVal:0;

	return () =>counter++;

}
