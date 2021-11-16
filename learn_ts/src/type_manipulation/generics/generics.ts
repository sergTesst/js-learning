function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: <Type>(arg: Type) => Type = identity;

//Generic constraints

//warnings here
// function loggingIdentity<Type>(arg: Type):Type{
//   console.log(arg.length);
//   return arg;
// }

interface Lengthwise {
  length: number;
}

function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length);
  return arg;
}

//warning
// loggingIdentity(3)

loggingIdentity({ length: 10, value: 3 });

//using type parametes in generic constraints

/** making constraint to ensure not grabbing a property that does not exists on the obj*/
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

let xObj = { a: 1, b: 2, c: 3, d: 4 };

getProperty(xObj, "a");

//warnings here
// getProperty(xObj, "m")

//Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.ts(2345)

//using class types in generics

//creating factories
function create<Type>(c: { new (): Type }): Type {
  //no warning if we
  //return new c
  return new c();
}

class BeeKeeper {
  hasMask: boolean = true;
}

class ZooKeeper {
  nametag: string = "Mikle";
}

class Animal {
  numLegs: number = 4;
}

class Bee extends Animal {
  keeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

const lionInstance = createInstance(Lion);
// lionInstance.keeper.nametag

const beeInstance = createInstance(Bee);
// beeInstance.keeper.hasMask
