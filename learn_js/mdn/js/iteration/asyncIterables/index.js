const isThisBrowser = (_) => this.constructor.name === "Window";

const cl = (...args) => {
  console.log(...args);
  if (isThisBrowser()) {
    const div = document.createElement("div");
    div.innerHTML = args.join(" ");
    document.getElementById("root").append(div);
  }
};

function samples() {
  async function iteratingOverAsyncIterables() {
    const asyncIterable = {
      [Symbol.asyncIterator]() {
        return {
          i: 0,
          next() {
            if (this.i < 3)
              return new Promise((resolve) =>
                setTimeout(
                  () => resolve({ value: this.i++, done: false }),
                  1000
                )
              );
            return Promise.resolve({ done: true });
          },
        };
      },
    };

    for await (let res of asyncIterable) cl("num ", res);
  }

  async function iteratingOverAsyncGenerators() {
    async function* asyncGenerator() {
      let i = 0;
      while (i < 3) {
        yield i++;
      }
    }
    for await (let res of asyncGenerator()) cl("num ", res);
  }

  async function asyncIterableForStreamData() {
    if (!isThisBrowser()) return;

    async function* streamAsyncIterable(stream) {
      const reader = stream.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            return;
          }
          yield value;
        }
      } catch (error) {
      } finally {
        reader.releaseLock();
      }
    }

    async function getResponseSize(url) {
      const response = await fetch(url);
      let responseSize = 0;

      for await (const chunk of streamAsyncIterable(response.body)) {
        responseSize += chunk.length;
      }
      cl(`Response size: ${responseSize} bytes`);

      return responseSize;
    }

    getResponseSize("https://jsonplaceholder.typicode.com/photos");
  }

  async function iteratingOverSyncIterablesAndGens() {
    function* generator() {
      yield 0;
      yield 1;
      yield Promise.resolve(2);
      yield Promise.resolve(3);
      yield 4;
    }

    for await (let num of generator()) {
      cl("num ", num);
    }
    cl("next");
    for (let num of generator()) {
      cl("num ", num);
    }
    cl("next");

    for (let num of generator()) {
      const res = await num;
      cl("res ", res);
    }
  }

  async function iteratingOverSyncIterablesAndGensWithRejectedPromises() {
    function* generator() {
      try {
        yield 0;
        yield 1;
        yield Promise.resolve(2);
        yield Promise.reject(3);
        yield 4;
        throw 5;
      } catch (error) {
        cl(error.message);
      } finally {
        cl("called finally");
      }
    }

    //finally was not called with awaited loop
    try {
      for await (let num of generator()) {
        cl("num ", num);
      }
    } catch (error) {
      cl("caught outside of awaited loop");
    }

    cl("next");

    try {
      for (let num of generator()) {
        const res = await num;
        cl("res ", res);
      }
    } catch (error) {
      cl("caught outside of loop ");
    }

    // 		num  0
    // num  1
    // num  2
    // caught outside of awaited loop

    // next
    // res  0
    // res  1
    // res  2
    // called finally
    // caught outside of loop
  }

  (function runFunctionsAbove() {
    // iteratingOverAsyncIterables();
    // iteratingOverAsyncGenerators();
    // asyncIterableForStreamData();
    // iteratingOverSyncIterablesAndGens();
    iteratingOverSyncIterablesAndGensWithRejectedPromises();
  })();
}

(function main() {
  samples();
})();
