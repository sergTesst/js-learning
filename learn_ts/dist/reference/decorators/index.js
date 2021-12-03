var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import "reflect-metadata";
const cl = (...args) => {
    console.log(...args);
};
function runDecorators() {
    function sample1() {
        function first() {
            cl("first(): factory evaluated");
            return function (target, propertyKey, descriptor) {
                cl("first(): called");
            };
        }
        function second() {
            cl("second(): factory evaluated");
            return function (target, propertyKey, descriptor) {
                cl("second(): called");
            };
        }
        class ExampleClass {
            method() { }
        }
        __decorate([
            first(),
            second(),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], ExampleClass.prototype, "method", null);
    }
    function sample2() {
        function sealed(constructor) {
            Object.seal(constructor);
            Object.seal(constructor.prototype);
        }
        let BugReport = class BugReport {
            constructor(t) {
                this.type = "report";
                this.title = t;
            }
        };
        BugReport = __decorate([
            sealed,
            __metadata("design:paramtypes", [String])
        ], BugReport);
    }
    function overrideTheConstructorToSetNewDefaults() {
        function reportableClassDecorator(constructor) {
            return class extends constructor {
                constructor() {
                    super(...arguments);
                    this.reportingUrl = "http://www...";
                }
            };
        }
        let BugReport = class BugReport {
            constructor(t) {
                this.type = "report";
                this.title = t;
            }
        };
        BugReport = __decorate([
            reportableClassDecorator,
            __metadata("design:paramtypes", [String])
        ], BugReport);
        const bug = new BugReport("Needs dark mode");
        cl(`bug.title `, bug.title);
        cl(`bug.type`, bug.type);
    }
    function decoratorAppliedTOAMehtodOfTheClass() {
        class Greeter {
            constructor(message) {
                this.greeting = message;
            }
            greet() {
                return `Hello ${this.greeting}`;
            }
        }
        __decorate([
            enumerable(false),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], Greeter.prototype, "greet", null);
        function enumerable(value) {
            return function (target, propertyKey, descriptor) {
                descriptor.enumerable = value;
            };
        }
    }
    function accessorDecoratorAppliedToAMemberOfTheClass() {
        class Point {
            constructor(x, y) {
                this._x = x;
                this._y = y;
            }
            get x() {
                return this._x;
            }
            get y() {
                return this._y;
            }
        }
        __decorate([
            configurable(false),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], Point.prototype, "x", null);
        __decorate([
            configurable(false),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], Point.prototype, "y", null);
        function configurable(value) {
            return function (target, propertyKey, descriptor) {
                descriptor.configurable = value;
            };
        }
    }
    function recordMetadataAboutTheProp() {
        const formatMetadataKey = Symbol("format");
        function format(formatString) {
            return Reflect.metadata(formatMetadataKey, formatString);
        }
        function getFormat(target, propertyKey) {
            return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
        }
        class Greeter {
            constructor(message) {
                this.greeting = message;
            }
            greet() {
                let formatString = getFormat(this, "greeting");
                return formatString.replace("%s", this.greeting);
            }
        }
        __decorate([
            format("Hello, %s"),
            __metadata("design:type", String)
        ], Greeter.prototype, "greeting", void 0);
        const greeter = new Greeter("my message");
        cl(`greeter.greet() `, greeter.greet());
    }
    function parameterDecoratorAppliedToParameterOfAMemberOfTheClass() {
        class BugReport {
            constructor(t) {
                this.type = "report";
                this.title = t;
            }
            print(verbose) {
                if (verbose) {
                    return `type: ${this.type}\ntitle: ${this.title}`;
                }
                else {
                    return this.title;
                }
            }
        }
        __decorate([
            __param(0, required),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Boolean]),
            __metadata("design:returntype", void 0)
        ], BugReport.prototype, "print", null);
        const requiredMetadataKey = Symbol("required");
        function required(target, propertyKey, parameterIndex) {
            let existingRequiredParameters = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
            existingRequiredParameters.push(parameterIndex);
            Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
        }
        function validate(target, propertyName, descriptor) {
            let method = descriptor.value;
            descriptor.value = function () {
                let requiredParameters = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
                if (requiredParameters) {
                    for (let parameterIndex of requiredParameters) {
                        if (parameterIndex >= arguments.length ||
                            !arguments[parameterIndex]) {
                            throw new Error("Missing required argument");
                        }
                    }
                }
                return method.apply(this, arguments);
            };
        }
    }
    function validateDecorator() {
        function validate(target, propertyKey, descriptor) {
            let set = descriptor.set;
            descriptor.set = function (value) {
                let type = Reflect.getMetadata("design:type", target, propertyKey);
                if (!(value instanceof type)) {
                    throw new TypeError(`Invalid type, got ${typeof value} not ${type.name}`);
                }
                set.call(this, value);
            };
        }
        class Point {
            constructor(x, y) {
                this.x = x;
                this.y = y;
            }
        }
        class Line {
            set start(value) {
                this._start = value;
            }
            get start() {
                return this._start;
            }
            set end(value) {
                this._end = value;
            }
            get end() {
                return this._end;
            }
        }
        __decorate([
            validate,
            __metadata("design:type", Point),
            __metadata("design:paramtypes", [Point])
        ], Line.prototype, "start", null);
        __decorate([
            validate,
            __metadata("design:type", Point),
            __metadata("design:paramtypes", [Point])
        ], Line.prototype, "end", null);
        const line = new Line();
        line.start = new Point(0, 32);
        class LineQuivalent {
            set start(value) {
                this._start = value;
            }
            get start() {
                return this._start;
            }
            set end(value) {
                this._end = value;
            }
            get end() {
                return this._end;
            }
        }
        __decorate([
            validate,
            Reflect.metadata("design:type", Point),
            __metadata("design:type", Point),
            __metadata("design:paramtypes", [Point])
        ], LineQuivalent.prototype, "start", null);
        __decorate([
            validate,
            Reflect.metadata("design:type", Point),
            __metadata("design:type", Point),
            __metadata("design:paramtypes", [Point])
        ], LineQuivalent.prototype, "end", null);
    }
    function runSamplesAbove() {
        validateDecorator();
    }
    runSamplesAbove();
}
(function main() {
    runDecorators();
})();
//# sourceMappingURL=index.js.map