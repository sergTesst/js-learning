interface Animal {
  live(): void;
}

interface Dog extends Animal {
  woof(): void;
}

type Example1 = Dog extends Animal ? number : string;

type Example2 = RegExp extends Animal ? number : string;

//generic with condition types

interface IdLabel {
  id: number;
}
interface NameLabel {
  name: string;
}

// function createLabel(id: number): IdLabel;
// function createLabel(name: string): NameLabel;
// function createLabel(nameOrId: string | number): IdLabel | NameLabel;
// function createLabel(nameOrId: string | number): IdLabel | NameLabel {
//   throw "not implemented";
// }

// Indeed we can encode that logic in a conditional type

type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel;

//simplify overloads
function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw "not implemented";
}

let a = createLabel("string label");
let b = createLabel(3.3);
let c = createLabel(Math.random() ? "string" : 124);

//conditional type constraints

// type MessageOf<T extends { message: unknown }> = T["message"];
type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;

interface Email {
  message: string;
}
interface Dog {
  bark(): void;
}

type EmailMessageContents = MessageOf<Email>;

type DogMessageContents = MessageOf<Dog>;

//Flatten flattens array types to their element types, but leaved them alone otherwise
type Flatten<T> = T extends any[] ? T[number] : unknown;

type Str = Flatten<string[]>;
type Num = Flatten<number[]>;

type unKnown = Flatten<string>;

//we used the infer keyword to declaratively introduce a new generic type variable named
//item instead of specifying how to retrieve the element type of T within the true branch
type FlattenInferred<Type> = Type extends Array<infer Item> ? Item : Type;

//helper type aliases using the infer keyword.
//extract the return type out from function types

type GetReturnType<Type> = Type extends (...args: never[]) => infer Return ? Return : never;

type NumReturned = GetReturnType<() => number>;

type StrReturned = GetReturnType<(x: string) => string>;

type BoolsArr = GetReturnType<(a: boolean, b: boolean) => boolean[]>;

declare function stringOrNum(x: string): number;
declare function stringOrNum(x: number): string;
declare function stringOrNum(x: string | number): string | number;

type T1 = ReturnType<typeof stringOrNum>;

//distributive conditional types

type ToArray<Type> = Type extends any ? Type[] : never;

//StrArrOrNumArr is union type
type StrArrOrNumArr = ToArray<string | number>; //type StrArrOrNumArr = string[] | number[]

type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;

//'StrArrOrNumArrNotUnion'
type StrArrOrNumArrNotUnion = ToArrayNonDist<string | number>; //type StrArrOrNumArrNotUnion = (string | number)[]
