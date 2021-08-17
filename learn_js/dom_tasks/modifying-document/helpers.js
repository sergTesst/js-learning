
export const helper=()=>{
}
helper.sleep = (ms)=>{
	cl('sleeping')
	return new Promise(resolve=>setTimeout(resolve, ms))
}