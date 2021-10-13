

const cl = console.log;

function evalJsCode(){
	function sample1(){
		cl(`eval('1+1') `,eval('1+1'));
		let val = 12;
		cl(`eval(let i = 1; ++i + ${val})`,eval(`let i = 1; ++i + ${val}`));

		eval('cl(val)');

		eval('val = 233');
		cl('val', val);

		eval('let x = 4; function f(){}');

		try {
			cl(typeof x);
		} catch (error) {
			cl(error.name);
		}
	}

	sample1();
}

(function main(){
	evalJsCode();

})();
	