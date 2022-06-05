"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractReporter_1 = __importDefault(require("./AbstractReporter"));
class TextReporter extends AbstractReporter_1.default {
    static render(results) {
        const allTests = TextReporter._renderGroup(results, true);
        const totalInfo = TextReporter._renderTotalInfo(results);
        const failedTests = TextReporter._renderFailedTests(TextReporter._getFailedTests(results));
        return allTests + totalInfo + failedTests;
    }
    static _renderGroup(resultsGroup, isRoot) {
        const str = [`\x1b[37m${resultsGroup.title || ''}\x1b[0m`];
        resultsGroup.results.forEach(element => {
            var _a;
            if (element.isGroup) {
                str.push(TextReporter._renderGroup(element));
            }
            else {
                const successful = (_a = element.result) === null || _a === void 0 ? void 0 : _a.successful;
                str.push(`  ${successful ? '\x1b[32m✔\x1b[0m' : '\x1b[31m✘\x1b[0m'} \x1b[2m\x1b[37m${element.title || ''}\x1b[0m`);
            }
        });
        const body = str.join('\n')
            .split('\n')
            .map((str) => '  ' + str)
            .join('\n');
        return `${body}`;
    }
    static _renderTotalInfo(results) {
        return results.successCount === results.testsCount
            ? `\n\n\x1b[32m✔ Завершено ${results.successCount} модульных тестов\x1b[0m\n`
            : `\n\n\x1b[31m✘ Провалено ${results.testsCount - results.successCount} из ${results.testsCount} модульных тестов:\x1b[0m\n`;
    }
    static _renderFailedTests(failedTests) {
        const str = failedTests.map((test) => {
            return `\n\x1b[37m${test.title}\n  \x1b[31m${test.result.errorDescription}\n    \x1b[2m\x1b[37m${test.result.stackTrace}\x1b[0m\n`;
        });
        return str.join('');
    }
}
exports.default = TextReporter;
//# sourceMappingURL=TextReporter.js.map