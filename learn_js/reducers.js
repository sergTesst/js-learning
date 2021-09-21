"use strict";

const _ = require("lodash");

function reducersTests() {
  function reducersTest1() {
    function addNumbers(prev, curr) {
      console.log({ prev, curr });
      return prev + curr;
    }

    const arr = [2, 3, 1, 55, 12];
    function reduceArr(arr, initialState) {
      return arr.reduce(addNumbers, initialState);
    }
    console.log("result: ", reduceArr(arr, 4));
  }

  function reducersTest2() {
    //Replace .filter().map() with .reduce()
    const numbers = [-5, 6, 2, 0];
    const doubledPositiveNumbers = numbers.reduce(
      getOnlyPositiveDoubledNums,
      []
    );
    console.log("doubledPositiveNumbers", doubledPositiveNumbers);

    function getOnlyPositiveDoubledNums(previousArr, current, index, arr) {
      // console.log('previousArr', previousArr);
      if (current > 0) {
        current *= 2;
        const resultArr = previousArr.concat(current);
        // console.log('resultArr', resultArr);
        return resultArr;
      }
      return previousArr;
    }
  }

  function removeDuplicatesFromArr() {
    // Remove duplicate items in an array
    let myArray = ["a", "b", "a", "b", "c", "e", "e", "c", "d", "d", "d", "d"];

    //solution 1
    console.log("first solution ", Array.from(new Set(myArray)));

    //solution with reduce
    const noDuplicatesArr = myArray.reduce(getReducedArrWithNoDuplicates, []);
    console.log("noDuplicatesArr ", noDuplicatesArr);
    function getReducedArrWithNoDuplicates(previousArr, current, index, arr) {
      if (!Array.from(previousArr).includes(current)) {
        return previousArr.concat(current);
      }
      return previousArr;
    }
  }

  function createObjectFromArrWithCountedItems() {
    // Counting instances of values in an object
    let names = ["Alice", "Bob", "Tiff", "Bruce", "Tiff", "Alice"];

    const countedObject = names.reduce(getObjWithCountedItems, {}); //{'Alice':2,'Bob':1,'Tiff':2,'Bruce':1}
    console.log("countedObject", countedObject);
    function getObjWithCountedItems(previousObj, current, index, arr) {
      //solution 1

      // if(arr.includes(current)){
      // 	if(Object.keys(previousObj).indexOf(current)!==-1){
      // 		let val = previousObj[current];
      // 		previousObj[current] = ++val;
      // 	}else{
      // 		previousObj[current] = 1;
      // 	}
      // }

      //solution 2

      if (current in previousObj) {
        previousObj[current]++;
      } else {
        previousObj[current] = 1;
      }

      return previousObj;
    }
  }

  function runGroupPeopleByPropery() {
    let people = [
      { name: "Alice", age: 21 },
      { name: "Max", age: 20 },
      { name: "Jane", age: 20 },
    ];
    let groupedPeople = groupBy(people, "age");
    console.log("groupedPeople ", groupedPeople);

    function groupBy(arrOfObjects, prop) {
      if (!Array.isArray(arrOfObjects)) return arrOfObjects;
      let groupedObj = arrOfObjects.reduce(getObjectWithGroupedProps, {});

      //solution 1
      // function getObjectWithGroupedProps(previousObj, current, index, arr){

      // 	let keyOfPreviousObj = current[prop];
      // 	// console.log('keyOfPreviousObj ', keyOfPreviousObj, 'current ', current);
      // 	if(!Object.keys(previousObj).includes(keyOfPreviousObj) && !previousObj[keyOfPreviousObj]){

      // 		previousObj[keyOfPreviousObj] = [current];
      // 		// console.log('new previousObj ', previousObj);

      // 		return previousObj;
      // 	}
      // 	let valueOfPreviousObj = previousObj[keyOfPreviousObj];
      // 	// console.log('valueOfPreviousObj ', valueOfPreviousObj);
      // 	// previousObj[keyOfPreviousObj] = valueOfPreviousObj.concat(current);
      // 	previousObj[keyOfPreviousObj] = [
      // 		...valueOfPreviousObj,
      // 		{
      // 			...current
      // 		}
      // 	]
      // 	return previousObj;

      // }

      //solution 2
      function getObjectWithGroupedProps(previousObj, current) {
        const key = current[prop];
        if (!previousObj[key]) {
          previousObj[key] = [];
        }
        previousObj[key].push(current);
        return previousObj;
      }

      return groupedObj;
    }
    // groupedPeople is:
    // {
    //   20: [
    //     { name: 'Max', age: 20 },
    //     { name: 'Jane', age: 20 }
    //   ],
    //   21: [{ name: 'Alice', age: 21 }]
    // }
  }

  function boundingInnerArraysOfObjectWithSpread() {
    //Bonding arrays contained
    //in an array of objects using the spread operator and initialValue

    // friends - an array of objects
    // where object field "books" is a list of favorite books
    let friends = [
      {
        name: "Anna",
        books: ["Bible", "Harry Potter"],
        age: 21,
      },
      {
        name: "Bob",
        books: ["War and peace", "Romeo and Juliet"],
        age: 26,
      },
      {
        name: "Alice",
        books: ["The Lord of the Rings", "The Shining"],
        age: 18,
      },
    ];

    const allBooks = friends.reduce(
      (prevArr, currentVal) => {
        return [...prevArr, ...currentVal.books];
      },
      ["Alphabet"]
    );

    console.log("allBooks ", allBooks);
  }

  function runPromiseInChain() {
    function runPromiseInSequence(arr, initialInput) {
      console.log("runPromiseInSequence ", arr, initialInput);
      return arr.reduce(async (promiseChain, curFunc) => {
        console.log("promiseChain ", promiseChain);
        console.log("curFunc ", curFunc);
        const val = await curFunc(initialInput);
        console.log(
          `val of awaited curFunc with initialInput ${initialInput}`,
          val
        );
        return promiseChain.then(curFunc);
      }, Promise.resolve(initialInput));
    }

    const p1 = (val) => {
      console.log("p1 val", val);
      return new Promise((resolve, reject) => {
        resolve(val * 2);
      });
    };
    const p2 = (val) => {
      console.log("p2 val", val);
      return new Promise((resolve, reject) => {
        resolve(val * 2);
      });
    };
    const f3 = (val) => {
      console.log("f3 val", val);
      return val * 3;
    };
    const p4 = (val) => {
      console.log("p4 val", val);
      return new Promise((resolve, reject) => {
        resolve(val * 4);
      });
    };
    const promiseArr = [p1, p2, f3, p4];
    runPromiseInSequence(promiseArr, 10).then(console.log);
  }

  function composition() {
    const double = (x) => x + x;
    const triple = (x) => 3 * x;
    const quadruple = (x) => 4 * x;

    // Function composition enabling pipe functionality
    const pipe =
      (...functions) =>
      (input) =>
        functions.reduce((acc, currentFunc) => currentFunc(acc), input);

    function explicitPipe(...functions) {
      console.log("...functions", functions);

      return function (input) {
        console.log("input ", input);

        return functions.reduce(
          // acc is the argument of passed function
          (acc, curFunc) => {
            console.log("acc ", acc, " curFunc ", curFunc);
            return curFunc(acc);
          },
          input
        );
      };
    }

    //composed functions for multiplication of specific values

    // const multiply6 = pipe(double, triple);
    // const multiply9 = pipe(triple, triple);
    // const multiply16 = pipe(double, quadruple);
    // const multiply24 = pipe(double, triple, quadruple);

    const multiply6 = explicitPipe(double, triple);
    const multiply9 = explicitPipe(triple, triple);
    const multiply16 = explicitPipe(double, quadruple);
    const multiply24 = explicitPipe(double, triple, quadruple);

    let res = multiply6(6);
    console.log("res multiply6(6)", res);

    res = multiply9(9);
    console.log("res multiply9(9)", res);

    res = multiply16(8);
    console.log("res multiply16(8)", res);

    res = multiply24(10);
    console.log("res multiply24(10)", res);
  }

  //TODO: Write map using reduce

  composition();
  // runPromiseInChain();
  // boundingInnerArraysOfObjectWithSpread();
  // runGroupPeopleByPropery();
  // createObjectFromArrWithCountedItems();
  // removeDuplicatesFromArr();
  // reducersTest2();
  // reducersTest1();
}

function arrayMethods() {
  function deleteRuns() {
    const arr1 = [1, 4, 5, 4, 52, 55, 1, 32, 1];
    delete arr1[0];
    console.log("arr after delele arr1[0]", arr1);
    console.log("typeof arr1[0]", typeof arr1[0]);
    const reducedArr = arr1.reduce(
      (initialArr, currentVar) =>
        currentVar ? initialArr.concat(currentVar) : initialArr,
      []
    );
    console.log("reduced arr", reducedArr);
  }

  deleteRuns();
}

function arrIntersection() {
  function lodashIntersection() {
    const res = _.intersection([2, 1], [2, 3]);
    // console.log("_.intersection([2, 1], [2, 3])", res);

    //sort base on more similar characters
    const userNames = [
      "jamesbondmir",
      "downfalljuno",
      "whiplashfog",
      "beatvulture",
      "relishhorn",
      "geminimelon",
    ];
    // const query = `lish`;
    const query = `mini`;

    console.log(`search for ${query} in ${userNames}`)

    const queryChars = query.split("");
    const resultArr = userNames
      .reduce((previousArr, currentName) => {
        const charsName = currentName.split("");
        const intersectedArr = _.intersectionWith(
          charsName,
          queryChars,
          _.isEqual
        );
        // console.log(
        //   "intersectedArr",
        //   intersectedArr,
        //   "of ",
        //   charsName.join(""),
        //   "and ",
        //   queryChars.join("")
        // );
        if (intersectedArr.length > 0) {
          return previousArr.concat(charsName.join(""));
        }
        return previousArr;
      }, [])
      .sort((first, second) => {
        return (
          _.intersectionWith(second.split(""), queryChars, _.isEqual).length -
          _.intersectionWith(first.split(""), queryChars, _.isEqual).length
        );
      }).sort((first, second) => {
        return second.indexOf(query) - first.indexOf(query);  
      });

    console.log("resultArr", resultArr);
    console.log("difference", _.difference(userNames, resultArr));
  }

  function checkWhetherQueryInStr() {
    const userNames = [
      "jamesbondmir",
      "downfalljuno",
      "whiplashfog",
      "beatvulture",
      "relishhorn",
      "geminimelon",
    ];
    const queryChars = `lish`.split("");
  }

  lodashIntersection();
}

(function main() {
  arrIntersection();

  // arrayMethods();
  // reducersTests();
})();
