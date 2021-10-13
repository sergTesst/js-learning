const cl = console.log;

function bitwiseOperators() {
  function parseIntRuns() {
    let num1 = parseInt("11000", 2);
    cl(`num1`, num1);

    let numBinary = num1.toString(2);

    cl("numBinary ", numBinary);

    let num8 = 8;
    let numKey = 1220461917;
    cl(`num8^numKey `, num8 ^ numKey);
    cl(
      `Number(${num8}^${numKey}).toString(2) `,
      Number(num8 ^ numKey).toString(2)
    );
    cl(`num8.toString(2) `, num8.toString(2));
    cl(`numKey.toString(2) `, numKey.toString(2));
    cl(
      `num8.toString(2)^numKey.toString(2) `,
      num8.toString(2) ^ numKey.toString(2)
    );
  }

  function bitwiseNot() {
    cl(`~3`, ~3);
    cl(`~-1`, ~-1);
  }

  function bitwiseLeftShift() {
    cl(`3<<1 `, 3 << 1); //6, multiplied by 2
    cl(`3<<2 `, 3 << 2); // 12, multiplied by 2 two times
    cl(`3<<3 `, 3 << 3); // 24, multiplied by 2 three times

    //works only with 32-bits numbers

    cl(` 10000000000 << 1 `, 10000000000 << 1);
    cl(` 10000000000 * 2 `, 10000000000 * 2);
  }

  function bitwiseRightShift() {
    cl(`9>>2 `, 9 >> 2);
    cl(`9>>1 `, 9 >> 1);
    cl(`8>>2 `, 8 >> 2);
    cl(`8>>1 `, 8 >> 1);
    cl(`7>>2 `, 7 >> 2);
    cl(`7>>1 `, 7 >> 1);
    cl(`-9>>1 `, -9 >> 1);
  }

  function usingBitwiseOperators() {
		
    var ACCESS_ADMIN = 1; // 00001
    var ACCESS_GOODS_EDIT = 2; // 00010
    var ACCESS_GOODS_VIEW = 4; // 00100
    var ACCESS_ARTICLE_EDIT = 8; // 01000
    var ACCESS_ARTICLE_VIEW = 16; // 10000

		var guest = ACCESS_ARTICLE_VIEW | ACCESS_GOODS_VIEW; // 10100
		var editor = guest | ACCESS_ARTICLE_EDIT | ACCESS_GOODS_EDIT; // 11110
		var admin = editor | ACCESS_ADMIN; // 11111

		cl(`editor & ACCESS_ADMIN `, editor & ACCESS_ADMIN? 'yes': 'no');
		cl('editor & ACCESS_ARTICLE_VIEW ', editor & ACCESS_ARTICLE_VIEW ? 'yes': 'no')
		cl('editor & ACCESS_GOODS_VIEW ', editor & ACCESS_GOODS_VIEW ? 'yes': 'no')
		cl('editor & ACCESS_GOODS_EDIT ', editor & ACCESS_GOODS_EDIT ? 'yes': 'no')

		let check = ACCESS_GOODS_VIEW | ACCESS_GOODS_EDIT;

		cl('admin & check ', admin & check ? 'yes': 'no')

  }


	function rounding(){

		function roundWithbitwiseNo(){
			cl(`~~18.444 `,~~18.444);
			cl(`18.444^0 `,18.444^0);
			cl(`31.22* 18.444 ^0 `,31.22* 18.444 ^0);

			cl(`1.4 + 1.3^0 `,1.4 + 1.3^0);
		}

    function checkWithMinusOne(){
      let n = 5; 

      let nBitwiseNo = ~n;

      cl('nBitwiseNo ', nBitwiseNo);

      if(nBitwiseNo){
        cl('n not -1');
      }

      let n1 = -1;

      if(!~n1){
        cl('n1 is 0');
      }

      let str = 'check';

      cl(`str.indexOf('eck')`, str.indexOf('eck'));
      cl(`~str.indexOf('eck')`, ~str.indexOf('eck'));

      if(~str.indexOf('eck')){
        cl('found');
      }
    }

    function leftShiftBitwise(){
      //operator a << b by shifting bits, essentially multiplies a by 2 powered by b;

      cl(`1<<2 `,1<<2); // 1*(2*2) = 4;
      cl(`1<<3 `,1<<3); // 1*(2^3) = 8;
      cl(`3<<3 `,3<<3); // 3*(2^3) = 24

      //operator a>>b, executes opposite operation integer division a by 2 powered by b
      cl(`8>>2 `,8>>2); // 8 : (2^2) = 2;
      cl(`11>> 2`,11>>2); // 11: (2^2) = 2 (3<4)  less significant bits was simply discarded
      cl(`12>> 2`,12>>2); // 12 : (2^2) = 3
    }

    leftShiftBitwise();

    // checkWithMinusOne();
		
		// roundWithbitwiseNo();

	}

  function tasks(){
    function task1(){
      cl(`123^0 `,123^0);
      cl(`0^123 `,0^123);
      cl(`~~123 `,~~123)
      cl(`~123 `,~123)
    }

    function task2(){
      const isInteger = (n) => {
        let rounded = n^0;
        return rounded === n ? true: false;
      }

      cl(`isInteger(1) `,isInteger(1))
      cl(`isInteger(1.5) `,isInteger(1.5))
      cl(`isInteger(-0.5) `,isInteger(-0.5))
    }

    task2();
    // task1();
  }

  function runFunctionsAbove() {
		
    tasks();

		// rounding();

		// usingBitwiseOperators();

    // bitwiseRightShift();

    // bitwiseLeftShift();

    // bitwiseNot();

    // parseIntRuns();
  }
  runFunctionsAbove();
}

(function main() {
  bitwiseOperators();
})();
