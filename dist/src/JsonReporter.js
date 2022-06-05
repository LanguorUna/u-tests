"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractReporter_1 = __importDefault(require("./AbstractReporter"));
class JsonReporter extends AbstractReporter_1.default {
    static render(results) {
        return JSON.stringify(results);
    }
    static writeReportFile(results, fileName = 'report.json') {
        super.writeReportFile(results, fileName);
    }
}
exports.default = JsonReporter;
//# sourceMappingURL=JsonReporter.js.map