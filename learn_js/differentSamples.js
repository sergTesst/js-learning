const cl = console.log;
const _ = require("lodash");

function runDiffSamples() {
  function typeOfLogs() {
    console.log(`typeof 1 `, typeof 1);
    console.log(`typeof String `, typeof String);
    console.log(`typeof typeof 1 `, typeof typeof 1);
  }

  function trueStatements() {
    cl(`typeof null == 'object'`, typeof null == "object");
    const b = {};
    cl(`b == b`, b == b);

    cl(` !![] == true`, !![] == true);
  }

  function concatenationAndAdd() {
    cl(+"1" + "1" + "2");
    cl("A" - "B" + "2");
    cl("A" - "B" + 2);
    cl(`isNaN([]) `, isNaN([]));
  }

  function emptyArrIf() {
    let arr = [];
    if (arr) {
      cl("arr is [] and true");
    } else {
      cl("[] is false");
    }
    let emptyStr = "";

    cl(`"" == [] `, "" == []);
    cl(`typeof emptyStr `, typeof emptyStr);
    cl(`typeof arr `, typeof arr);

    if (emptyStr) {
      cl(`"" is true`);
    } else {
      cl(`"" is false`);
    }
  }
  function objectFromPrimitives() {
    let falseObj = new Boolean(false);
    if (falseObj) cl("falseObj true");
    if (falseObj == false) cl("falseObj == false");
  }

  function getElementOfArrayByArrProp() {
    const todo1 = {
      id: "a",
      text: "text1",
    };
    const todo2 = {
      id: "b",
      text: "text2",
    };

    const arr = [todo1, todo2];

    cl(`arr.a`, arr.a);
    cl(`arr[0]`, arr[0]);
    cl(`arr['0']`, arr["0"]);
    // cl(`arr['0']`, arr.'0');
    // cl(`arr['0']`, arr.0);
    cl(`arr.todo1`, arr.todo1);
    cl(`Object.entries(arr)`, Object.entries(arr));
  }

  function areObjectsEqual() {
    const a = {
      toggled: false,
      val: "a1",
    };
    const b = a;
    b.toggled = true;
    let c = {};
    Object.assign(c, b);
    cl(`a == b, a===b `, a == b, a === b);
    cl(`a == c, a===c `, a == c, a === c);
    cl(`c == b, c===b `, c == b, c === b);
    cl("c ", c);
  }

  function createAlphabet() {
    // for(i=9,a='';++i<36;)a+=i.toString(36) // 38, cannot be used in an expression

    // 52 directly returnig the string desired
    // const res = [...Array(26)].map((_) => {
    //   const ires = ++i;
    //   console.log("ires", ires);
    //   const toString36Res = ires.toString(36);
    //   console.log("toString36Res", toString36Res);
    //   return toString36Res;
    // }, (i = 9));

    const resMy = [...Array(26)].map((_) => (++i).toString(36), (i = 9));

    const alphabetLength = 26;
    const groupingNum = 3;
    const alphabetDiv3Remainder = alphabetLength % groupingNum;
    console.log(`alphabetDiv3Remainder `, alphabetDiv3Remainder);
    const groupPairs = (alphabetLength - alphabetDiv3Remainder) / groupingNum;
    console.log(`groupPairs `, groupPairs);

    const chunks = _.chunk(resMy, groupingNum);
    const reducedChunks = chunks.reduce((prev, curr) => {
      prev = prev.concat(curr.join(", "));
      return prev;
    }, []);

    console.log("reducedChunks ", reducedChunks);

    // 53 assign to a variable
    // [...Array(26)].map(_=>a+=(++i).toString(36),a='',i=9)

    // 52 ES7 direct return
    // (i=9,[for(_ of Array(26))(++i).toString(36)].join``)

    // 51 ES7 assign to a variable
    // i=9,a='',[for(_ of Array(26))a+=(++i).toString(36)]
  }

  function dateFromString() {
    const isoDate = "2019-09-19T09:34:32.083Z";

    const date = new Date(isoDate);
    cl("date ", date, "date.getMonth() ", date.getMonth());
    cl(`date.toDateString() `, date.toDateString());
    cl(`date.toLocaleDateString() `, date.toLocaleDateString());
    cl(`date.getUTCDate() `, date.getUTCDate());
    console.log(`new Date() `, new Date());
    console.log(` new Date().toDateString() `, new Date().toDateString());
  }

  function stringIncludesOtherString() {
    const str = "aec";

    console.log(
      `str.includes("a"), str.includes("A"), str.includes("b")`,
      str.includes("a"),
      str.includes("A"),
      str.includes("b")
    );
  }
  function sortByCurrentMonth() {
    const currentMonth = 10;
    const arrOfUsers = [
      { val: "a", dateiso: "1992-12-18" },
      { val: "b", dateiso: "1992-11-23" },
      { val: "с", dateiso: "1992-01-11" },
      { val: "с", dateiso: "1992-05-12" },
      { val: "a1", dateiso: "1993-05-02" },
      { val: "c2", dateiso: "1993-02-07" },
      { val: "сl", dateiso: "1993-02-07" },
      { val: "с", dateiso: "1993-03-19" },
      { val: "сb", dateiso: "1993-05-23" },
      { val: "сf", dateiso: "1993-10-04" },
    ];

    const sortedUsers = arrOfUsers.sort((u1, u2) => {
      let month1 = new Date(u1.dateiso).getMonth();
      let month2 = new Date(u2.dateiso).getMonth();
      // console.log(`month1 ${month1}, month2 ${month2}`);
      if (month1 < currentMonth) month1 += 12;
      if (month2 < currentMonth) month2 += 12;
      // console.log(`res month1 ${month1}, month2 ${month2}`);

      return month1 - month2;
    });

    cl("sorted users \n", sortedUsers);
  }

  function sortOnlyArrOfMonth() {
    const months = {
      January: 0,
      February: 1,
      March: 2,
      April: 3,
      May: 4,
      June: 5,
      July: 6,
      August: 7,
      September: 8,
      October: 9,
      November: 10,
      December: 11,
    };

    const monthsArr = ["March", "February", "November", "December", "January"];

    const month = new Date().getMonth();

    monthsArr.sort(function (m1, m2) {
      let n1 = months[m1],
        n2 = months[m2];
      if (n1 < month) {
        n1 = n1 + 12;
      }
      if (n2 < month) {
        n2 = n2 + 12;
      }
      return n1 - n2;
    });

    console.log(monthsArr);
  }

  function splitStringWith2Chars() {
    const strOdd = "abeev";
    let res = strOdd.match(/\w{2}/g);
    cl("res ", res);
    const strEven = "abeeve";
    res = strEven.match(/\w{2}/g);
    cl("res ", res);
  }

  function convertStrToPairsWithOddLastUndescore() {
    function solution(s) {
      let matched = (s + "_").match(/.{2}/g);
      cl("matched", matched);
      if (!matched) return [];
      return matched;
    }

    cl(`solution('12ve') `, solution("12ve"));
    cl(`solution('12v') `, solution("12v"));
  }

  function testMatchReturn() {
    let numStrOdd = "12312";
    let matched = (numStrOdd + "_").match(/\w{3}/g);
    cl("matched ", matched);

    let numStrEven = "123123";
    matched = (numStrEven + "_").match(/\w{3}/g);
    cl("matched ", matched);
  }

  function deleteElementFromArr() {
    let a = { a: "1" };
    let b = { b: "2" };
    const c = { inner: "val" };

    const arr = [a, b, c];
    delete c.inner;
    c.other = "other";
    b = null;

    cl("arr", arr);
  }

  function fibNums() {
    function getFibonachiArr(length) {
      const arr = [];
      function recursionFib(first, second, counter, length) {
        if (counter > length) {
          return arr;
        }
        arr.push(first);
        recursionFib(second, first + second, ++counter, length);
      }
      recursionFib(0, 1, 0, length);
      return arr;
    }

    const arr = getFibonachiArr(9);
    cl("arr ", arr);
  }

  function testClosure() {
    let a = 5;
    let b = { x: 9 };
    let c;

    (function () {
      let a = 1;
      let c = b;
      b.x = 1;
      c.x = 0;
    })();

    // uncomment after answer
    console.log(`a, b, c `, a, b, c);
  }

  function calculateStaticClassProps() {
    const greetingType = "helloWorld";
    class Greetings {
      static get [greetingType]() {
        return "Hello, World!";
      }
    }
    const d = "some name";
    const a = {
      [`${d}`]: "eff",
    };

    console.log(Greetings.helloWorld); // 'Hello, World!'
  }

  function hoisting() {
    //article https://blog.bitsrc.io/hoisting-in-modern-javascript-let-const-and-var-b290405adfda
    var a;
    cl("var a above ", a);
    a = 5;

    cl("var b below ", b);
    var b = 5;

    // let a1;
    // cl("let a1 above ", a1);
    // a1 = 5;

    // cl("let b1 below ", b1);
    // let b1 = 5;
  }

  function testObjectEntriesLegacy() {
    var myObj = Object.entries({
      key1: "first",
      key2: "second",
      key3: "third",
      key4: "fourth",
    });
    console.log("myObj", myObj);

    var targetingObj = {
      key1: "first",
      key2: "second",
      key3: "third",
      key4: "fourth",
    };

    var myObjKeys = Object.keys(targetingObj);

    var objEntries = [];

    for (var key in targetingObj) {
      objEntries.push([key, targetingObj[key]]);
    }

    console.log("objEntries ", objEntries);

    for (var entry of Object.entries(targetingObj)) {
      console.log("entry ", entry);
    }
  }

  function testLegacyOfObjKeys() {
    var targetingObj = {
      key1: "first",
      key2: "second",
      key3: "third",
      key4: "fourth",
    };

    var objEntries = [];
    var objKeys = Object.keys(targetingObj);
    console.log("objKeys", objKeys);
    for (var index = 0; index < objKeys.length; index++) {
      var key = objKeys[index];
      console.log("key", key);
      if (Object.prototype.hasOwnProperty.call(targetingObj, key)) {
        objEntries.push([key, targetingObj[key]]);
      }
    }
    console.log("objEntries", objEntries);
  }

  function runFuncAbove() {
    // typeOfLogs();

    // trueStatements();

    // concatenationAndAdd();
    // emptyArrIf();
    // objectFromPrimitives();
    // getElementOfArrayByArrProp();
    // areObjectsEqual();

    // createAlphabet();
    // dateFromString();
    // stringIncludesOtherString();
    // sortByCurrentMonth();
    // sortOnlyArrOfMonth();

    // splitStringWith2Chars();
    // convertStrToPairsWithOddLastUndescore();

    // testMatchReturn();
    // deleteElementFromArr();
    // fibNums();
    // testClosure();
    // calculateStaticClassProps();
    // hoisting();
    // testObjectEntriesLegacy();
    testLegacyOfObjKeys();
  }
  runFuncAbove();
}

(function main() {
  runDiffSamples();
})();
