"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AssertResult_1 = __importDefault(require("./AssertResult"));
class StandartAssertResult extends AssertResult_1.default {
    constructor(successful, message, actualValue, expectedValue) {
        super(successful, message, actualValue);
        this.expectedValue = expectedValue;
    }
}
exports.default = StandartAssertResult;
//# sourceMappingURL=StandardAssertResult.js.map