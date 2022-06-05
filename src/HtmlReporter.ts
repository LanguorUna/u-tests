import AbstractReporter from './AbstractReporter';
import { IGroupResults } from './GroupTest';
import { ITestResult } from './Test';
import {readFileSync} from 'fs';
import {resolve} from 'path';

export default class HtmlReporter extends AbstractReporter {
    static render(results: IGroupResults): string {
        const allTests = HtmlReporter._renderGroup(results, true);
        const totalInfo = HtmlReporter._renderTotalInfo(results);
        const failedTests = HtmlReporter._renderFailedTests(HtmlReporter._getFailedTests(results));

        const css = readFileSync(resolve(__dirname, '../style.css')).toString();
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

    static writeReportFile(results: IGroupResults, fileName: string = 'report.html') {
        super.writeReportFile(results, fileName);
    }

    private static _renderGroup(resultsGroup: IGroupResults, isRoot?: boolean): string {
        const htmls = [];
        resultsGroup.results.forEach(element => {
            if ((element as IGroupResults).isGroup) {
                htmls.push(HtmlReporter._renderGroup(element as IGroupResults));
            } else {
                const successful = (element as ITestResult).result?.successful;
                htmls.push(`<li ${successful ? '' : 'class="test-title__failed"'}><span class="${successful ? 'checkmark' : 'mark'}">${successful ? '✔' : '✘'}</span>${element.title || ''}</li>`);
            }
        });
        return `${isRoot ? '' : '<li>'}${resultsGroup.title || ''}<ul>${htmls.join('')}</ul>${isRoot ? '' : '</li>'}`
    }

    private static _renderFailedTests(failedTests: ITestResult[]): string {
        const htmls = failedTests.map((test) => {
            return `<li><span class="errors__title">${test.title}</span><details class="errors__group"><summary class="errors__description">${test.result.errorDescription}</summary><p class="errors__path">${test.result.stackTrace}</p></details></li>`
        });
        return htmls.join('');
    }

    private static _renderTotalInfo(results: IGroupResults): string {
        return results.successCount === results.testsCount
            ? `<div class="tests-result__successfully"><span class="checkmark">✔</span>Завершено ${results.successCount} модульных тестов</div>`
            : `<div class="tests-result__failed"><span class="mark">✘</span>Провалено ${results.testsCount - results.successCount} из ${results.testsCount} модульных тестов:</div>`
    }
}