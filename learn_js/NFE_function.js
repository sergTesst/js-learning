function NFERuns() {
  function functionLength() {
    const c1 = (a) => {};
    const c2 = (a, b) => {};
    const cMany = (a, b, ...more) => {};

    console.log("c1.length", c1.length);
    console.log("c2.length", c2.length);
    console.log("cMany.length", cMany.length);
  }

  function countFuncCalls() {
    const hi = () => {
      console.log("Hi");
      hi.counter++;
    };
    hi.counter = 0;
    hi();
    hi();
    hi();
    console.log("hi.counter", hi.counter);
  }

  function nfeExample1() {
    //function can reference to it
    //inside its body
    let hi = function hiFunc(who) {
      if (who) console.log("hi to ", who);
      else hiFunc("some other name");
      return {
        hiFunc,
      };
    };
    const obj1 = hi("me");
    const obj2 = hi();
    obj2.hiFunc("second");

    const welcome = hi;

    try {
      welcome();
    } catch (error) {
      console.log(error.name);
    }
    hi = null;
    welcome("welcome name");
  }

  function makeCounter() {
    function makeCounter() {
      function counter() {
        return ++counter.count;
      }
      counter.count = 0;
      counter.set = (val) => {
        counter.count = val;
        return counter.count;
      };
      counter.decrease = () => {
        return --counter.count;
      };
      return counter;
    }

    const count = makeCounter();
    console.log(`count() `, count());
    console.log(`count() `, count());
    console.log(`count() `, count());
    console.log(`count.set(32) `, count.set(32));
    console.log(`count() `, count());
    console.log(`count.decrease() `, count.decrease());
    console.log(`count.decrease() `, count.decrease());
    console.log(`count() `, count());
  }

  function makeFuncSum() {
    let sum = function thisSum(val) {

      function innerSum(val1) {
        return thisSum(val1 + val);
      }
      innerSum.result = val;
      return innerSum;
    };

    console.log(
			`sum(1)(2).result`, sum(1)(2).result, 
			`sum(1)(2).result === 3 `, sum(1)(2).result === 3); // 1 + 2
    
		console.log(
      `sum(1)(2)(3)`,
      sum(1)(2)(3),
      `sum(1)(2)(3) == 6 `,
      sum(1)(2)(3) == 6
    ); // 1 + 2 + 3
    console.log(
      `sum(5)(-1)(2)`,
      sum(5)(-1)(2),
      `sum(5)(-1)(2) == 6`,
      sum(5)(-1)(2) == 6
    );
    console.log(
      `sum(6)(-1)(-2)(-3)`,
      sum(6)(-1)(-2)(-3),
      `sum(6)(-1)(-2)(-3) == 0`,
      sum(6)(-1)(-2)(-3) == 0
    );
    console.log(
      `sum(0)(1)(2)(3)(4)(5)`,
      sum(0)(1)(2)(3)(4)(5),
      `sum(0)(1)(2)(3)(4)(5) == 15`,
      sum(0)(1)(2)(3)(4)(5) == 15
    );
  }
	function makeFuncSumSolution(){
		function sum(a){
			let currentSum = a;
			function innerSum(b){
				currentSum+=b;
				return innerSum;
			}
			innerSum.toString = function(){
				return currentSum;
			}
			return innerSum;
		}
    console.log(
			`sum(1)(2)`, sum(1)(2), 
			`sum(1)(2) === 3 `, sum(1)(2) === 3); // 1 + 2
    
		console.log(
      `sum(1)(2)(3)`,
      sum(1)(2)(3),
      `sum(1)(2)(3) == 6 `,
      sum(1)(2)(3) == 6
    ); // 1 + 2 + 3
    console.log(
      `sum(5)(-1)(2)`,
      sum(5)(-1)(2),
      `sum(5)(-1)(2) == 6`,
      sum(5)(-1)(2) == 6
    );
    console.log(
      `sum(6)(-1)(-2)(-3)`,
      sum(6)(-1)(-2)(-3),
      `sum(6)(-1)(-2)(-3) == 0`,
      sum(6)(-1)(-2)(-3) == 0
    );
    console.log(
      `sum(0)(1)(2)(3)(4)(5)`,
      sum(0)(1)(2)(3)(4)(5),
      `sum(0)(1)(2)(3)(4)(5) == 15`,
      sum(0)(1)(2)(3)(4)(5) == 15
    );

	}

	makeFuncSumSolution();

  //makeFuncSum();
  // makeCounter();
  // nfeExample1();
  // countFuncCalls();
  // functionLength();
}

(function main() {
  NFERuns();
})();
