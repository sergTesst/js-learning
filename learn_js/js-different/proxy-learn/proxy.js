"use strict";

const cl = console.log;

function proxySamples() {
  function proxyFirstSample() {
    let target = {};
    let emptyHandler = {};
    let proxy = new Proxy(target, emptyHandler);

    proxy.test = 5;
    console.log("target.test", target.test);
    console.log("proxy.test", proxy.test);

    for (const key in proxy) console.log("key ", key);
  }

  /**
   * in order to intercept reading operation handler must have method
   * get(target, property, receiver)
   *
   * It fires when trying to read a property of an object with args
   *
   * 	- target is original obj, that was passed as a first arg into the constructor new Proxy
   *  - property is a name
   *  - receiver - when prop is getter than receiver is an object, that will be
   *  used as this when it is called.
   */

  function readNONExistingValFromArrReturn0() {
    let numbers = [0, 1, 2];

    numbers = new Proxy(numbers, {
      get(target, prop) {
        const valueInInTarget = Boolean(prop in target);
        const defaultValue = 0;
        if (valueInInTarget) {
          return target[prop];
        } else {
          return defaultValue;
        }
      },
    });

    console.log("numbers[1] ", numbers[1]);
    console.log("numbers[123] ", numbers[123]);
  }

  function readNONExistingValFromDictinaryReturnIt() {
    let dictionary = {
      hello: "hola",
      second: "meaningOfSecond",
    };

    dictionary = new Proxy(dictionary, {
      get(target, prop) {
        const valueInInTarget = Boolean(prop in target);
        if (valueInInTarget) {
          return target[prop];
        } else {
          return prop;
        }
      },
    });
    console.log('dictionary["second"] ', dictionary["second"]);
    console.log('dictionary["notExisting"] ', dictionary["notExisting"]);
  }

  function typedArrOfNumbers() {
    let numbers = [];

    numbers = new Proxy(numbers, {
      set(target, prop, val) {
        if (typeof val === "number") {
          target[prop] = val;
          //dont forget to return true here. We have to follow invariants
          return true;
        }
        return false;
      },
    });

    numbers.push(1);
    numbers.push(2);
    console.log("numbers.length ", numbers.length);

    try {
      numbers.push("not a number");
    } catch (error) {
      console.log(`error.name `, error.name);
    }

    /**
     * Object.keys, for..in loop and most of other methods, which work with list of props
     * use inner method [[OwnPropertyKeys]] ( intercept with trap ownKeys )
     */
  }

  function onlyKeysWithoutDashValid() {
    let user = {
      name: "UserName",
      age: 34,
      _password: "***",
    };

    user = new Proxy(user, {
      ownKeys(target) {
        return Object.keys(target).filter((key) => !key.startsWith("_"));
      },
    });

    for (let key in user) console.log(`key`, key);

    console.log(`Object.keys(user) `, Object.keys(user));
    console.log(`Object.values(user) `, Object.values(user));
  }

  function doesNotReturnNonExistingKeys() {
    let user = {};

    user = new Proxy(user, {
      ownKeys(target) {
        return ["a", "b", "c"];
      },
    });

    console.log(Object.keys(user)); // <empty>
  }

  function returnsNonExistingKeys() {
    let user = {};

    user = new Proxy(user, {
      ownKeys(target) {
        return ["a", "b", "c"];
      },

      //if prop is missing for obj
      //we have to intercept its descriptor
      //and rewrite it
      getOwnPropertyDescriptor(target, prop) {
        //calls for every prop
        return {
          enumerable: true,
          configurable: true,
        };
      },
    });

    console.log(Object.keys(user)); // [a, b, c]
  }

  function protectPrivatePropForObj() {
    let user = {
      name: "UserName",
      age: 34,
      _password: "***",
      checkPassword(value) {
        return value === this._password;
      },
    };
    // user.checkPassword.bind(user);

    console.log("user.checkPassword('***')", user.checkPassword("***"));

    user = new Proxy(user, {
      get(target, prop) {
        if (prop.startsWith("_")) {
          throw new Error(
            "private props can not be accessed from outside the object"
          );
        } else {
          let value = target[prop];
          return typeof value === "function" ? value.bind(target) : value;
        }
      },
      set(target, prop, value) {
        if (prop.startsWith("_")) {
          throw new Error(
            "private props can not be accessed from outside the object"
          );
        } else {
          target[prop] = value;
          return true;
        }
      },
      deleteProperty(target, prop) {
        if (prop.startsWith("_")) {
          throw new Error(
            "private props can not be accessed from outside the object"
          );
        } else {
          delete target[prop];
          return true;
        }
      },
      ownKeys(target) {
        return Object.keys(target).filter((key) => !key.startsWith("_"));
      },
    });

    try {
      console.log(`user._password `, user._password);
    } catch (error) {
      console.log(`error.message `, error.message);
    }
    try {
      user._password = "changed";
    } catch (error) {
      console.log(`error.message `, error.message);
    }
    try {
      delete user._password;
    } catch (error) {
      console.log(`error.message `, error.message);
    }
    try {
      console.log(`Object.keys(user) `, Object.keys(user));
    } catch (error) {
      console.log(`error.message `, error.message);
    }

    /**
     * this solution is not perfect. it can become confusion if we pass
     * original obj somewhere and want to define where is the original obj and proxy
     *
     * Moreover object can be proxied several time in order to add different
     * features
     *
     * private props with # sign in classes has the same effect.
     * private props have own cons. Particularly they can't be inherited.
     *
     */
  }

  function hasTrapProxy() {
    let range = {
      start: 1,
      end: 10,
    };

    range = new Proxy(range, {
      has(target, prop) {
        return prop >= target.start && prop <= target.end;
      },
    });

    cl(`3 in range `, 3 in range);
    cl(`7 in range `, 7 in range);
    cl(`12 in range `, 12 in range);
  }

  function wrapApply() {
    let user = {
      name: "UserName",
      age: 34,
      _password: "***",
      checkPassword(value) {
        return value === this._password;
      },
      toString() {
        return this.name;
      },
    };

    function delay(f, ms) {
      return function () {
        setTimeout(() => f.apply(this, arguments), ms);
      };
    }

    function hiToUser(prop) {
      console.log(`hi ${prop}`);
    }

    let hiToUserDelayed = delay(hiToUser, 1000);
    hiToUserDelayed(user);

    function delayWithProxy(f, ms) {
      return new Proxy(f, {
        apply(target, thisArg, args) {
          setTimeout(() => target.apply(thisArg, args), ms);
        },
      });
    }

    let hiToUserDelayedWithProxy = delayWithProxy(hiToUser, 1000);
    console.log(`hiToUser.length `, hiToUser.length);
    hiToUserDelayedWithProxy(user);
  }

  /**
   * for every inner methods that proxy intercepts, there is corresponding reflect method
   * which has the same name and orgs as proxy has
   */

  function proxySet() {
    const user = {};
    Reflect.set(user, "age", 12);
    console.log("user.age", user.age);
    cl(`Object.entries(user) `, Object.entries(user));
  }

  function proxyUserWithReflection() {
    let user = {
      name: "usersFirstName",
    };

    user = new Proxy(user, {
      get(target, prop, receiver) {
        console.log(
          `get. prop ${prop} `,
          `target: `,
          target,
          `receiver `,
          receiver
        );

        return Reflect.get(target, prop, receiver);
      },
      set(target, prop, val, receiver) {
        console.log(
          `set. prop ${prop}, val ${val} `,
          ` target: `,
          target,
          `receiver `,
          receiver
        );

        return Reflect.set(target, prop, val, receiver);
      },
    });

    cl("let {name} = user;");
    let { name } = user;

    cl(`name = 'changed name';`);
    name = "changed name";

    cl(`cl('user.name', user.name);`);
    cl("user.name", user.name);

    cl(`user.name =  'second change';`);
    user.name = "second change";

    cl(`let otherName = user.name;`);
    let otherName = user.name;

    cl(`otherName = 'third change';`);
    otherName = "third change";

    cl(`cl('user.name', user.name);`);
    cl("user.name", user.name);
  }

  function proxyForGetterForUserWithPrivateProp() {
    let user = {
      _name: "Guest",
      get name() {
        return this._name;
      },
    };

    let userProxy = new Proxy(user, {
      get(target, propertyKey, receiver) {
        // return target[propertyKey]; // if we inherit target we will get an bug of reading private props
        // return Reflect.get(target, propertyKey, receiver);

        return Reflect.get(...arguments);
      },
    });

    cl(`userProxy.name `, userProxy.name);

    let admin = {
      __proto__: userProxy,
      _name: "adminUser",
    };

    cl(`admin.name `, admin.name);
  }

  function builtInProxyObjectsForMapObj() {
    let map = new Map();

    let proxyErroredMap = new Proxy(map, {});

    try {
      proxyErroredMap.set("test", 1);
      //map set tries to access its own prop this.[[MapData]],
      // but this===proxy and fires an error
    } catch (error) {
      cl(error.name);

      //map saves all its data in the built in slot [[MapData]]. Proxy does not have
      // such slot

      let proxyMap = new Proxy(map, {
        get(target, prop, receiver) {
          let val = Reflect.get(...arguments);
          return typeof val === "function" ? val.bind(target) : value;
        },
      });
      proxyMap.set("test", 1);

      cl(`proxyMap.get('test') `, proxyMap.get("test"));
    }
  }

  function privateFieldsInClass() {
    class User {
      #name = "user1 Name";

      getName() {
        return this.#name;
      }

      get name() {
        return this.#name;
      }
    }

    let user = new User();
    cl(`user.name `, user.name);

    user = new Proxy(user, {
      get(target, prop, receiver) {
        let val = Reflect.get(...arguments);
        return typeof val === "function" ? val.bind(target) : value;
      },
    });

    try {
      cl(`user.name `, user.getName());
      cl(`user.name `, user.name); /// ERROR HERE obj does not have name prop
    } catch (error) {
      cl(error.message);
    }
  }

  function proxyAndOriginalObjIsDifferentObjects() {
    let allUsers = new Set();

    class User {
      constructor(name) {
        this.name = name;
        allUsers.add(this);
      }
    }

    let user = new User("UserName");

    cl(`allUsers.has(user) `, allUsers.has(user));

    user = new Proxy(user, {});

    cl(`allUsers.has(user) [[Proxy]] `, allUsers.has(user));
  }

  function revocableProxyForObject() {
    let obj = {
      data: "important data",
    };

    let revokesWeakMap = new WeakMap();
    //we used WeakMap in order not to  block  garbage collection
    //

    let { proxy, revoke } = Proxy.revocable(obj, {});

    revokesWeakMap.set(proxy, revoke);
    cl("proxy.data ", proxy.data);

    cl("revoking proxy");
    revoke = revokesWeakMap.get(proxy);
    revoke();
    try {
      cl("proxy.data ", proxy.data);
    } catch (error) {
      cl(error.name);
    }
  }

  function RunFuncsAbove() {
    revocableProxyForObject();

    // proxyAndOriginalObjIsDifferentObjects();

    // privateFieldsInClass();

    // builtInProxyObjectsForMapObj();

    // proxyForGetterForUserWithPrivateProp();

    // proxyUserWithReflection();
    // proxySet();

    // wrapApply();
    // hasTrapProxy();
    // protectPrivatePropForObj();

    returnsNonExistingKeys();
    // doesNotReturnNonExistingKeys();
    // onlyKeysWithoutDashValid();

    // typedArrOfNumbers();

    // readNONExistingValFromDictinaryReturnIt();
    // readNONExistingValFromArrReturn0();
    // proxyFirstSample();
  }
  RunFuncsAbove();
}

function proxyTasks() {
  function returnErrorInsteadOfUndefined_withProxy() {
    let user = {
      name: "John",
    };

    function wrap(target) {
      return new Proxy(target, {
        get(target, prop, receiver) {
          if (
            //  !Object.keys(target).includes(prop)
            !(prop in target)
          ) {
            return new TypeError(`object does not contain ${prop}`);
          } else {
            let val = Reflect.get(...arguments);
            return typeof val === "function" ? val.bind(target) : val;
          }
        },
      });
    }
    user = wrap(user);

    cl("user.name ", user.name);

    try {
      cl("user.age ", user.age);
    } catch (error) {
      cl(error.name);
    }
  }

  function returnElementsFromArrIfIndexIsNegative() {
    let array = [1, 2, 3];

    array = new Proxy(array, {
      get(target, prop, receiver) {
        let val;
        let targetArr = Array.from(target);
        prop = Number(prop);
        if (prop < 0 && Math.abs(prop) <= targetArr.length) {
          prop = targetArr.length + prop;

          return Reflect.get(target, prop, receiver);
        } else if (Math.abs(prop) > targetArr.length) {
          return new TypeError(`${prop} is out of ${targetArr.length}`);
        } else {
          val = Reflect.get(...arguments);
        }
        return typeof val === "function" ? val.bind(target) : val;
      },
    });

    cl("array ", array);
    cl("array[0] ", array[0]);
    cl("array[1] ", array[1]);
    cl("array[-1] ", array[-1]);
    cl("array[-3] ", array[-3]);

    try {
      cl("array[-4] ", array[-4]);
    } catch (error) {
      cl(error.name);
    }
    try {
      cl("array[4] ", array[4]);
    } catch (error) {
      cl(error.name);
    }
  }

  function observableWithProxy() {
    function makeObservable(target) {
      
      let proxyTarget = {
        ...target,
        observe:function (hand) {
          this.handlers.push(hand);
        },
        handlers:[],
      }

      proxyTarget = new Proxy(proxyTarget, {
        set(target, prop, val, receiver) {
          let setResult = Reflect.set(target, prop, val, receiver);
          if(setResult){
            Array.from(target.handlers).forEach(handler => handler(prop, val));
          }
          return setResult;
        },
        get(target, prop, receiver){
          let val = Reflect.get(...arguments);
          return typeof val === "function" ? val.bind(target) : val;
        }
      });

      return proxyTarget;

    }

    let user = {
      job: 'dev',
    };

    user = makeObservable(user);

    user.observe((key, value) => {
      cl('first observer');

      cl(`set ${key}=${value}`);
    });


    user.observe((key, value) => {
      cl('second observer');

      cl(`set ${key}=${value}`);
    });


    user.name = "Smith";

    user.wow = 'wow reaction';

    user.hi = function(){
      console.log(`( ${this['job']} ) ${this.name} says hi.`);
    }

    user.hi();
  }

  function runFuncsAbove() {
    observableWithProxy();

    // returnElementsFromArrIfIndexIsNegative();

    // returnErrorInsteadOfUndefined_withProxy();
  }
  runFuncsAbove();
}

(function main() {
  proxyTasks();

  // proxySamples();
})();
