
//promisify
export function functionPromiseWrapperBuilder(func,manyArgs=false){
	return function(...args){
		return new Promise((resolve,reject)=>{
			function callback(err,...results){
				if(err){
					return reject(err);
				}else{
					return resolve(manyArgs?results:results[0]);
				}
			}
			args.push(callback);
			console.log('this ', this);
			func(...args);
			// func.call(this,...args);
		});
	};
};