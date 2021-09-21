function strictModeForFuncs() {
  function strict() {
    // Function-level strict mode syntax
    "use strict";
    function nested() {
      return "And so am I!";
    }
    return "Hi!  I'm a strict mode function!  " + nested();
  }
  function notStrict() {
    return "I'm not strict.";
  }
}

// Assuming no global variable mistypeVariable exists
// this line throws a ReferenceError due to the
// misspelling of variable

// 'use strict';

// mistypeVariable = 17;

//for not strict mistypeVariable will be prop of window obj

function assignmentsWhichWouldLeadToSilentyFailToThrowAnException() {
  "use strict";

  // Assignment to a non-writable global
  var undefined = 5; // throws a TypeError
  var Infinity = 5; // throws a TypeError

  // Assignment to a non-writable property
  var obj1 = {};
  Object.defineProperty(obj1, "x", { value: 42, writable: false });
  obj1.x = 9; // throws a TypeError

  // Assignment to a getter-only property
  var obj2 = {
    get x() {
      return 17;
    },
  };
  obj2.x = 5; // throws a TypeError

  // Assignment to a new property on a non-extensible object
  var fixed = {};
  Object.preventExtensions(fixed);
  fixed.newProp = "ohai"; // throws a TypeError
}

function cannotDelObjPrototype() {
  "use strict";
  delete Object.prototype; // throws a TypeError
}

function notHidingDuplicatedArgs() {
  // function sum(a, a, c) {
  //   // !!! syntax error
  //   "use strict";
  //   return a + a + c; // wrong if this code ran
  // }
}

function forbidsA_0_PrefixedOctalLiteralOrOclalEscapeSequence() {
  var a = 0o10; // ES2015: Octal

  ("use strict");
  var sum =
    015 + // !!! syntax error
    197 +
    142;

  var sumWithOctal = 0o10 + 8;
  console.log(sumWithOctal); // 16
}

function forbidsSettingPropToPrimitives() {
  (function () {
    "use strict";

    false.true = ""; // TypeError
    (14).sailing = "home"; // TypeError
    "with".you = "far away"; // TypeError
  })();
}
// forbidsSettingPropToPrimitives();

function SyntaxErrorForDuplicatedPropsOfObj() {
  "use strict";
  var o = { p: 1, p: 2 }; // syntax error prior to ECMAScript 2015
}

// SyntaxErrorForDuplicatedPropsOfObj();

function defineVarsInEval() {
	// 'use strict';

  var x = 17;
  var evalX = eval("'use strict'; var x = 42; x;");
  console.log(`x === 17 `,x === 17);
  console.log(`evalX === 42 `,evalX === 42);
}

// defineVarsInEval();

function forbidsDeletePlainNames(){
	'use strict';

	var x;
	delete x; // !!! syntax error

	eval('var y; delete y;'); // !!! syntax error

}

// forbidsDeletePlainNames();


function assigningToArguments() {
  function f(a) {
    "use strict";
    a = 42;
    return [a, arguments[0]];
  }
  var pair = f(17);
  console.log(`pair[0] === 42 `, pair[0] === 42);
  console.log(`pair[1] === 17 `, pair[1] === 17);

  //strict mode
  // pair[0] === 42  true
  // pair[1] === 17  true

  //normal code
  // pair[0] === 42  true
  // pair[1] === 17  false
}

function createOrAssignToEvalOrArguments() {
  "use strict";

  // var eval = 17;
  // arguments++;
  // ++eval;
  // var obj = { set p(arguments) { } };
  // var eval;
  // try { } catch (arguments) { }
  // function x(eval) { }
  // function arguments() { }
  // var y = function eval() { };
  // var f = new Function('arguments', "'use strict'; return 17;");
}

function argumentsCalleeInNotSupported() {
  "use strict";
  var f = function () {
    return arguments.callee;
  };
  f(); // throws a TypeError
}

function showMeThisWithStrictOrWithout() {
  "use strict";

  const a = {
    innerFunc: function () {
      console.log("literal obj this", this);
    },
  };
  a.innerFunc(); // this === innerFunc

  const b = () => console.log(`const b `, this);
  b(); // window or undefined

  function c(...args) {
    console.log(`function c() `, this, ...args);
  }
  c(); // window or undefined

  b.apply(a); //window or undefined arrow functions cannot change this
  c.apply(a); // innerFunc because functions can change this

  const boundC = c.bind(a);
  boundC("bound C");
}

function SecuringJs() {
  "use strict";
  function fun() {
    return this;
  }
  console.log(`fun() === undefined `, fun() === undefined);
  console.log(`fun.call(2) === 2 `, fun.call(2) === 2);
  console.log(`fun.apply(null) === null `, fun.apply(null) === null);
  console.log(
    `fun.call(undefined) === undefined `,
    fun.call(undefined) === undefined
  );
  console.log(`fun.bind(true)() === true `, fun.bind(true)() === true);
}

function restrictedArgumentsAndCaller() {
  // function restricted() {
  //   "use strict";
  //   restricted.caller; // throws a TypeError
  //   restricted.arguments; // throws a TypeError
  // }
  // function privilegedInvoker() {
  //   return restricted();
  // }
  // privilegedInvoker();
}

function prohibitionTheFunctionsOfNotTheTopLevel() {
  //  Note that function statements outside top
  //level are permitted in ES2015.

  "use strict";
  if (true) {
    function f() {
      console.log("body of f");
    } // !!! syntax error
    f();
  }

  for (var i = 0; i < 5; i++) {
    function f2() {} // !!! syntax error
    f2();
  }

  function baz() {
    // kosher
    function eit() {} // also kosher
  }
}

(function main() {
  // prohibitionTheFunctionsOfNotTheTopLevel();
  //restrictedArgumentsAndCaller();
  // SecuringJs();
  // showMeThisWithStrictOrWithout();
  // argumentsCalleeInNotSupported()
  // createOrAssignToEvalOrArguments();
  // assigningToArguments();
  // assignmentsWhichWouldLeadToSilentyFailToThrowAnException();
  // strictModeForFuncs();
})();
