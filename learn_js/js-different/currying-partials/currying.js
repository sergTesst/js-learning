const _ = require("lodash");

const cl = console.log;

function curryingSamples() {
  function curryingSample1() {
    function curry(f) {
      return function (a) {
        return function (b) {
          return f(a, b);
        };
      };
    }

    const sum = (a, b) => a + b;

    let carriedSum = curry(sum);

    cl("carriedSum(1)(3) ", carriedSum(1)(3));
  }

  function lodashCurring() {
    function log(date, importance, message) {
      cl(
        `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] [${importance}] ${message}`
      );
    }

    log = _.curry(log);

    // log(new Date(), "DEBUG", "some data");

    // log(new Date())('DEBUG')('some data');

    function handyFixedLogger() {
      let logNow = log(new Date());

      logNow("INFO", "data msg");

      function handyDebugLogger() {
        let debugForNow = logNow("DEBUG");

        debugForNow("my debug message");
      }
      handyDebugLogger();
    }
    handyFixedLogger();
  }

  function customCurry() {
    function curry(func) {
      return function curried(...args) {
        if (args.length >= func.length) {
          return func.apply(this, args);
        } else {
          return function pass(...args2) {
            return curried.apply(this, args.concat(args2));
          };
        }
      };
    }

    function sum3(a, b, c) {
      return a + b + c;
    }

    function sum2(a, b) {
      return a + b;
    }

    let curriedSum3 = curry(sum3);

    cl(`curriedSum3(1, 2, 3) `, curriedSum3(1, 2, 3));
    cl(`curriedSum3(1)(2,3) `, curriedSum3(1)(2, 3));
    cl(`curriedSum3(1)(2)(3) `, curriedSum3(1)(2)(3));
  }

  function objectToPrimitive() {
    let user = {
      name: "jo",
      money: 1000,
      toString() {
        return `{name: "${this.name}"}`;
      },
      [Symbol.toPrimitive](hint) {
        cl(`hint: ${hint}`);
        return hint === "string" ? `name ${this.name}` : this.money;
      },
    };

    cl("user ", user);
    cl("+user ", +user);
    cl(user + 500);
  }

  function multipleArgsCurry() {
    const sum = (...args) => args.reduce((a, v) => a + v, 0);

    function curry(fn) {
      const argumentsArray = [];

      function subCurry(...args) {
        argumentsArray.push(...args);

        return subCurry;
      }

      subCurry[Symbol.toPrimitive] = () => {
        const result = fn.apply(this, argumentsArray);
        argumentsArray.length = 0;

        return result;
      };

      return subCurry;
    }

    const curriedSum = curry(sum);

    console.log(String(curriedSum(1, 2, 3))); /* 6 */
    console.log(Number(curriedSum(1)(2, 3)(1, 2, 3, 4)(4))); /* 20 */
    console.log(Number(curriedSum(1)(2)(3)(4))); /* 10 */
		
  }

  function runFuncsAbove() {

		multipleArgsCurry();

    // objectToPrimitive();

    // customCurry();

    //lodashCurring();

    // curryingSample1();
  }
  runFuncsAbove();
}

(function main() {
  curryingSamples();
})();
