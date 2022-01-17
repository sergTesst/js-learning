const cl = console.log;

function samples() {
  function createSimpleIterator() {
    const iterator = {
      next: function () {
        // ...
      },
      [Symbol.iterator]: function () {
        return this;
      },
    };
  }

  function stringIteratableObj() {
    const str = "hi1";
    cl(`typeof str[Symbol.iterator] `, typeof str[Symbol.iterator]);
  }

  function getStringIterator() {
    const str = "hi1";
    const iteratorInstance = str[Symbol.iterator]();

    cl(`iteratorInstance + ''`, iteratorInstance + "");

    cl(`iteratorInstance.next() `, iteratorInstance.next());
    cl(`iteratorInstance.next() `, iteratorInstance.next());
    cl(`iteratorInstance.next() `, iteratorInstance.next());

    // ...spread constructs use iteration protocol under the hood
    cl(`[...str] `, [...str]);
  }

  function customIterator() {
    const someStr = new String("content");

    someStr[Symbol.iterator] = function () {
      return {
        // return the iterator obj, returning a single element (the string "bye")

        next: function () {
          return this._first
            ? {
                value: "bye",
                done: (this._first = false),
              }
            : {
                done: true,
              };
        },
        _first: true,
      };
    };

    cl(`[...someStr] `, [...someStr]);
    cl(`someStr + "" `, someStr + "");
  }
  //string array typedArray map set are built-in iterables,
  //because of their prototype objects implements an @@iterator method
  function customIterableGenerator() {
    const myIterable = {};
    myIterable[Symbol.iterator] = function* () {
      yield 1;
      yield "custom data";
      yield ["another data", "with number", 21];
    };

    cl(`[...myIterable] `, [...myIterable]);
  }

  function apiAcceptingIterables() {
    const res = new Map([
      [1, "a"],
      [2, "b"],
      [3, "c"],
    ]).get(2);

    cl("map res", res);

    const myObj = {};

    const weakMapRes = new WeakMap([
      [{}, "a"],
      [myObj, "b"],
      [{}, "c"],
    ]).get(myObj);

    cl(` weakMapRes`, weakMapRes);

    cl(` new Set([1, 2,3 ]).has(3)`, new Set([1, 2, 3]).has(3));
    cl(` new Set('123').has(3)`, new Set("123").has(3));
    cl(` new Set('123').has("3")`, new Set("123").has("3"));

    const weakSetIterableGeneratorGetRes = new WeakSet(
      (function* () {
        yield {};
        yield myObj;
        yield {};
      })()
    ).has(myObj);

    cl("weakSetIterableGeneratorGetRes ", weakSetIterableGeneratorGetRes);
  }

  function syntaxExpectingIterables() {
    for (const value of ["1", "2", "3"]) {
      cl("value", value);
    }

    cl(`[...'abc'] `, [..."abc"]);

    function* gen() {
      yield* ["a", "b", "c"];
    }

    cl(`gen() `, gen());
    cl(`gen().next() `, gen().next());
    cl(`gen().next() `, gen().next());
    cl(`gen().next() `, gen().next());
    cl(`gen().next() `, gen().next());

    [a, b, c] = new Set(["a", "b", "c"]);

    cl("a", a);
  }

  function simpleIterator() {
    function makeIterator(arr) {
      if (!Array.isArray(arr)) return;
      let nextIndex = 0;
      return {
        next: function () {
          return nextIndex < arr.length
            ? {
                value: arr[nextIndex++],
                done: false,
              }
            : {
                done: true,
              };
        },
      };
    }

    const it = makeIterator(["fizz", "buzz"]);

    cl(` it.next().value`, it.next().value);
    cl(` it.next().value`, it.next().value);
    cl(` it.next().value`, it.next().value);
    cl(` it.next().value`, it.next().done);
  }

  function infiniteIterator() {
    function idMaker(arr) {
      let nextIndex = 0;
      return {
        next: function () {
          return {
            value: nextIndex++,
            done: false,
          };
        },
      };
    }

    const it = idMaker();

    cl(`it.next().value `, it.next().value);
    cl(`it.next().value `, it.next().value);
    cl(`it.next().value `, it.next().value);
    cl(`it.next().value `, it.next().value);
    cl(`it.next().value `, it.next().value);
  }

  function withAGenerator() {
    function* makeSimpleGenerator(arr) {
      let nextIndex = 0;
      while (nextIndex < arr.length) {
        yield arr[nextIndex++];
      }
    }

    const gen = makeSimpleGenerator(["fizz", "buzz"]);

    cl(`gen.next() `, gen.next());
    cl(`gen.next() `, gen.next());
    cl(`gen.next() `, gen.next());
    cl(`gen.next() `, gen.next());

    function* idMaker() {
      let index = 0;
      while (true) {
        yield index++;
      }
    }
    const it = idMaker();

    cl(`it.next().value `, it.next().value);
    cl(`it.next().value `, it.next().value);
    cl(`it.next().value `, it.next().value);
    cl(`it.next().value `, it.next().value);
    cl(`it.next().value `, it.next().value);
  }

  function withEs2015Class() {
    class SimpleClass {
      constructor(data) {
        if (!Array.isArray(data)) return;
        this.data = data;
      }

      [Symbol.iterator]() {
        let index = 0;

        return {
          next: () => {
            if (index < this.data.length) {
              return { value: this.data[index++], done: false };
            } else {
              return { done: true };
            }
          },
        };
      }
    }

    const simple = new SimpleClass([1, 2, 3, 4, 5]);

    for (const val of simple) {
      cl("val ", val);
    }
  }

  function knowTypeOfGeneratorObject() {
    const aGenerator = (function* () {
      yield 1;
      yield 2;
      yield 3;
    })();

    cl(`typeof aGenerator.next `, typeof aGenerator.next);
    cl(
      `typeof aGenerator[Symbol.iterator] `,
      typeof aGenerator[Symbol.iterator]
    );

    cl(`aGenerator[Symbol.iterator]()`, aGenerator[Symbol.iterator]());

    cl(
      `aGenerator[Symbol.iterator]() === aGenerator `,
      aGenerator[Symbol.iterator]() === aGenerator
    );

    cl(` [...aGenerator]`, [...aGenerator]);
    cl(` Symbol.iterator in aGenerator`, Symbol.iterator in aGenerator);

    // 		typeof aGenerator.next  function
    // typeof aGenerator[Symbol.iterator]  function
    // aGenerator[Symbol.iterator]() Object [Generator] {}
    // aGenerator[Symbol.iterator]() === aGenerator  true
    //  [...aGenerator] [ 1, 2, 3 ]
    //  Symbol.iterator in aGenerator true
  }

  (function runFunctionsAbove() {
    // createSimpleIterator();
    // stringIteratableObj();
    // getStringIterator();
    // customIterator();
    // customIterableGenerator();
    // apiAcceptingIterables();
    // syntaxExpectingIterables();
    // simpleIterator();
    // infiniteIterator();
    // withAGenerator();
    // withEs2015Class();
    knowTypeOfGeneratorObject();
  })();
}

(function main() {
  samples();
})();
