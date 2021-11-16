"use strict";
function identity(arg) {
    return arg;
}
let myIdentity = identity;
function loggingIdentity(arg) {
    console.log(arg.length);
    return arg;
}
loggingIdentity({ length: 10, value: 3 });
function getProperty(obj, key) {
    return obj[key];
}
let xObj = { a: 1, b: 2, c: 3, d: 4 };
getProperty(xObj, "a");
function create(c) {
    return new c();
}
class BeeKeeper {
    constructor() {
        this.hasMask = true;
    }
}
class ZooKeeper {
    constructor() {
        this.nametag = "Mikle";
    }
}
class Animal {
    constructor() {
        this.numLegs = 4;
    }
}
class Bee extends Animal {
    constructor() {
        super(...arguments);
        this.keeper = new BeeKeeper();
    }
}
class Lion extends Animal {
    constructor() {
        super(...arguments);
        this.keeper = new ZooKeeper();
    }
}
function createInstance(c) {
    return new c();
}
const lionInstance = createInstance(Lion);
const beeInstance = createInstance(Bee);
//# sourceMappingURL=generics.js.map