"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
class AbstractReporter {
    /**
     * Получить представление результатов прохождения тестов
     */
    static render(results) {
        return '';
    }
    /**
     * Записать отчет в файл
     * @param fileName
     */
    static writeReportFile(results, fileName = `report.txt`) {
        (0, fs_1.writeFileSync)(fileName, this.render(results));
    }
    static _getFailedTests(resultsGroup, failedTests) {
        const tests = failedTests || [];
        resultsGroup.results.forEach(element => {
            var _a;
            if (element.isGroup) {
                AbstractReporter._getFailedTests(element, tests);
            }
            else {
                if (!((_a = element.result) === null || _a === void 0 ? void 0 : _a.successful)) {
                    tests.push(element);
                }
            }
        });
        return tests;
    }
}
exports.default = AbstractReporter;
//# sourceMappingURL=AbstractReporter.js.map