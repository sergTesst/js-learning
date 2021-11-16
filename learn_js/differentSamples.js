const cl = console.log;

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

  function runFuncAbove() {
    // typeOfLogs();

    // trueStatements();

    // concatenationAndAdd();
    // emptyArrIf();
    objectFromPrimitives();
  }
  runFuncAbove();
}

(function main() {
  runDiffSamples();
})();
