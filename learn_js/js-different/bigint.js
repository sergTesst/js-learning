
const cl = console.log;

function bigintRuns(){

	const bigint = 1234567890123456789012345678901234567890n;
	const sameBigint = BigInt(`1234567890123456789012345678901234567890`);

	const bigintFromNum = BigInt(10);

	cl('bigint ', bigint);
	cl('sameBigint ', sameBigint);
	cl('bigintFromNum ', bigintFromNum);

	cl(`1n + 2n `,1n + 2n);
	cl(`5n / 2n `, 5n / 2n);
	
	try {
		cl(`1n+2 `,1n+2)
	} catch (error) {
		cl(error.name);
	}

	cl(`1==1n `, 1==1n);
	cl(`1===1n `, 1===1n);


	if(0n){
		//never reaches that point
	}

	

}

(function main() {
  bigintRuns();
})();