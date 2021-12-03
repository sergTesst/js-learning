import "reflect-metadata";

const cl = (...args: unknown[]) => {
  console.log(...args);
};

//decorator factory

// function color(value: string){
// 	//this is the decorator factory, it sets up
// 	// the returned decorator function
// 	return function(target){
// 		//this is the decorator
// 		//do something with 'target' and 'value'
// 	}
// }

//decocator composition
// @f @g x

// or
// @f
// @g
// x

function runDecorators(): void {
  function sample1() {
    function first() {
      cl("first(): factory evaluated");
      return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
      ) {
        cl("first(): called");
      };
    }
    function second() {
      cl("second(): factory evaluated");
      return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
      ) {
        cl("second(): called");
      };
    }

    class ExampleClass {
      @first()
      @second()
      method() {}
    }
  }

  function sample2() {
    function sealed(constructor: Function) {
      Object.seal(constructor);
      Object.seal(constructor.prototype);
    }

    @sealed
    class BugReport {
      type = "report";
      title: string;
      constructor(t: string) {
        this.title = t;
      }
    }
  }

  function overrideTheConstructorToSetNewDefaults() {
    function reportableClassDecorator<T extends { new (...args: any[]): {} }>(
      constructor: T
    ) {
      return class extends constructor {
        reportingUrl = "http://www...";
      };
    }

    @reportableClassDecorator
    class BugReport {
      type = "report";
      title: string;
      constructor(t: string) {
        this.title = t;
      }
    }

    const bug = new BugReport("Needs dark mode");
    cl(`bug.title `, bug.title);
    cl(`bug.type`, bug.type);

    // note that the decorator _does not_ change the typescript type
    // and so the new property `reportingURL` is not known
    // to the type system;
    // bug.reportingURL -> error
    // Property 'reportingURL' does not exist on type 'BugReport'.
  }

  function decoratorAppliedTOAMehtodOfTheClass() {
    class Greeter {
      greeting: string;
      constructor(message: string) {
        this.greeting = message;
      }

      @enumerable(false)
      greet() {
        return `Hello ${this.greeting}`;
      }
    }

    function enumerable(value: boolean) {
      return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
      ) {
        descriptor.enumerable = value;
      };
    }
  }

  function accessorDecoratorAppliedToAMemberOfTheClass() {
    class Point {
      private _x: number;
      private _y: number;
      constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
      }

      @configurable(false)
      get x() {
        return this._x;
      }
      @configurable(false)
      get y() {
        return this._y;
      }
    }

    function configurable(value: boolean) {
      return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
      ) {
        descriptor.configurable = value;
      };
    }
  }

  function recordMetadataAboutTheProp() {
    const formatMetadataKey = Symbol("format");
    function format(formatString: string) {
      return Reflect.metadata(formatMetadataKey, formatString);
    }

    function getFormat(target: any, propertyKey: string) {
      return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
    }

    class Greeter {
      @format("Hello, %s")
      greeting: string;
      constructor(message: string) {
        this.greeting = message;
      }

      greet() {
        let formatString = getFormat(this, "greeting");
        return formatString.replace("%s", this.greeting);
      }
    }

    const greeter = new Greeter("my message");
    cl(`greeter.greet() `, greeter.greet());
  }

  function parameterDecoratorAppliedToParameterOfAMemberOfTheClass() {
    class BugReport {
      type = "report";
      title: string;
      constructor(t: string) {
        this.title = t;
      }

      // @validate
      print(@required verbose: boolean) {
        if (verbose) {
          return `type: ${this.type}\ntitle: ${this.title}`;
        } else {
          return this.title;
        }
      }
    }

    const requiredMetadataKey = Symbol("required");

    function required(
      target: Object,
      propertyKey: string | symbol,
      parameterIndex: number
    ) {
      let existingRequiredParameters: number[] =
        Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];

      existingRequiredParameters.push(parameterIndex);

      Reflect.defineMetadata(
        requiredMetadataKey,
        existingRequiredParameters,
        target,
        propertyKey
      );
    }

    function validate(
      target: any,
      propertyName: string,
      descriptor: TypedPropertyDescriptor<Function>
    ) {
      let method = descriptor.value!;

      descriptor.value = function () {
        let requiredParameters: number[] = Reflect.getOwnMetadata(
          requiredMetadataKey,
          target,
          propertyName
        );

        if (requiredParameters) {
          for (let parameterIndex of requiredParameters) {
            if (
              parameterIndex >= arguments.length ||
              !arguments[parameterIndex]
            ) {
              throw new Error("Missing required argument");
            }
          }
        }

        return method.apply(this, arguments);
      };
    }
  }

  function validateDecorator() {
    function validate<T>(
      target: any,
      propertyKey: string,
      descriptor: TypedPropertyDescriptor<T>
    ) {
      let set = descriptor.set!;

      descriptor.set = function (value: T) {
        let type = Reflect.getMetadata("design:type", target, propertyKey);

        if (!(value instanceof type)) {
          throw new TypeError(
            `Invalid type, got ${typeof value} not ${type.name}`
          );
        }
        set.call(this, value);
      };
    }

    class Point {
      constructor(public x: number, public y: number) {}
    }
    class Line {
      private _start?: Point;
      private _end?: Point;

      @validate
      set start(value: Point) {
        this._start = value;
      }

      get start() {
        return this._start as Point;
      }

      @validate
      set end(value: Point) {
        this._end = value;
      }

      get end() {
        return this._end as Point;
      }
    }

    const line = new Line();

    line.start = new Point(0, 32);

    //@ts-ignore
    // line.end = {};
    // fails at runtime with:
    // > invalid type, got object not point

    class LineQuivalent {
      private _start?: Point;
      private _end?: Point;

      @validate
      @Reflect.metadata("design:type", Point)
      set start(value: Point) {
        this._start = value;
      }

      get start() {
        return this._start as Point;
      }

      @validate
      @Reflect.metadata("design:type", Point)
      set end(value: Point) {
        this._end = value;
      }

      get end() {
        return this._end as Point;
      }
    }
  }

  function runSamplesAbove() {
    // sample1();
    // sample2();
    // overrideTheConstructorToSetNewDefaults();
    // decoratorAppliedTOAMehtodOfTheClass();
    // accessorDecoratorAppliedToAMemberOfTheClass();
    // recordMetadataAboutTheProp();
    validateDecorator();
  }
  runSamplesAbove();
}

(function main(): void {
  runDecorators();
})();
