"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AssertResult_1 = __importDefault(require("./AssertResult"));
class Test {
    constructor(title, bodyFunction, file) {
        this._ended = false;
        this.title = title;
        this.file = file;
        this._fn = bodyFunction;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const isAsync = this._fn.length;
            try {
                if (isAsync) {
                    yield new Promise((resolve, reject) => {
                        const done = (errorText) => {
                            if (errorText) {
                                // выход через done('описание ошибки')
                                reject(new AssertResult_1.default(false, errorText));
                            }
                            else {
                                // ok
                                this._ended = true;
                                resolve(null);
                            }
                        };
                        this._fn(done);
                    });
                }
                else {
                    this._fn();
                    this._ended = true;
                }
            }
            catch (error) {
                this._result = error instanceof Error
                    ? new AssertResult_1.default(false, error.message, error.name, error.stack)
                    : error;
                this._ended = true;
            }
        });
    }
    getResult() {
        return {
            title: this.title,
            file: this.file,
            result: this._ended
                ? this._result || { successful: true }
                : null
        };
    }
    reset() {
        this._ended = false;
    }
}
exports.default = Test;
//# sourceMappingURL=Test.js.map