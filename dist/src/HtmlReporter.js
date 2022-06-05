"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractReporter_1 = __importDefault(require("./AbstractReporter"));
const fs_1 = require("fs");
const path_1 = require("path");
class HtmlReporter extends AbstractReporter_1.default {
    static render(results) {
        const allTests = HtmlReporter._renderGroup(results, true);
        const totalInfo = HtmlReporter._renderTotalInfo(results);
        const failedTests = HtmlReporter._renderFailedTests(HtmlReporter._getFailedTests(results));
        const css = (0, fs_1.readFileSync)((0, path_1.resolve)(__dirname, '../style.css')).toString();
        const date = new Date();
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <style>${css}</style>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>u-tests</title>
            </head>
            <body>
                <div class="report">
                    <h1 class="report__title">Отчёт о прохождении модульных тестов</h1>
                    <h3 class="report__date">от ${date.toLocaleDateString()} в ${date.toLocaleTimeString()}</h3>
                    ${allTests}
                    ${totalInfo}
                    <ul class="errors">${failedTests}</ul>
                </div>
            </body>
            </html>
        `.trim();
    }
    static writeReportFile(results, fileName = 'report.html') {
        super.writeReportFile(results, fileName);
    }
    static _renderGroup(resultsGroup, isRoot) {
        const htmls = [];
        resultsGroup.results.forEach(element => {
            var _a;
            if (element.isGroup) {
                htmls.push(HtmlReporter._renderGroup(element));
            }
            else {
                const successful = (_a = element.result) === null || _a === void 0 ? void 0 : _a.successful;
                htmls.push(`<li ${successful ? '' : 'class="test-title__failed"'}><span class="${successful ? 'checkmark' : 'mark'}">${successful ? '✔' : '✘'}</span>${element.title || ''}</li>`);
            }
        });
        return `${isRoot ? '' : '<li>'}${resultsGroup.title || ''}<ul>${htmls.join('')}</ul>${isRoot ? '' : '</li>'}`;
    }
    static _renderFailedTests(failedTests) {
        const htmls = failedTests.map((test) => {
            return `<li><span class="errors__title">${test.title}</span><details class="errors__group"><summary class="errors__description">${test.result.errorDescription}</summary><p class="errors__path">${test.result.stackTrace}</p></details></li>`;
        });
        return htmls.join('');
    }
    static _renderTotalInfo(results) {
        return results.successCount === results.testsCount
            ? `<div class="tests-result__successfully"><span class="checkmark">✔</span>Завершено ${results.successCount} модульных тестов</div>`
            : `<div class="tests-result__failed"><span class="mark">✘</span>Провалено ${results.testsCount - results.successCount} из ${results.testsCount} модульных тестов:</div>`;
    }
}
exports.default = HtmlReporter;
//# sourceMappingURL=HtmlReporter.js.map