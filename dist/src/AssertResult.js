"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AssertResult {
    constructor(successful, message, actualValue, stackTrace) {
        this.successful = successful;
        this.errorDescription = message;
        this.actualValue = actualValue;
        this.stackTrace = stackTrace || new Error().stack;
    }
}
exports.default = AssertResult;
//# sourceMappingURL=AssertResult.js.map