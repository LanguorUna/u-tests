"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.afterEach = exports.beforeEach = exports.after = exports.before = exports.it = exports.test = exports.suite = exports.describe = exports.Assert = void 0;
const Assert_1 = __importDefault(require("./src/Assert"));
exports.Assert = Assert_1.default;
const Loader_1 = require("./src/Loader");
Object.defineProperty(exports, "describe", { enumerable: true, get: function () { return Loader_1.describe; } });
Object.defineProperty(exports, "suite", { enumerable: true, get: function () { return Loader_1.suite; } });
Object.defineProperty(exports, "test", { enumerable: true, get: function () { return Loader_1.test; } });
Object.defineProperty(exports, "it", { enumerable: true, get: function () { return Loader_1.it; } });
Object.defineProperty(exports, "before", { enumerable: true, get: function () { return Loader_1.before; } });
Object.defineProperty(exports, "after", { enumerable: true, get: function () { return Loader_1.after; } });
Object.defineProperty(exports, "beforeEach", { enumerable: true, get: function () { return Loader_1.beforeEach; } });
Object.defineProperty(exports, "afterEach", { enumerable: true, get: function () { return Loader_1.afterEach; } });
//# sourceMappingURL=u-tests.js.map