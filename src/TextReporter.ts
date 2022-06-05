import AbstractReporter from './AbstractReporter';
import {IGroupResults} from './GroupTest';
import { ITestResult } from './Test';

export default class TextReporter extends AbstractReporter {
    static render(results?: IGroupResults): string {
        const allTests = TextReporter._renderGroup(results, 2);
        const totalInfo = TextReporter._renderTotalInfo(results);
        const failedTests = TextReporter._renderFailedTests(TextReporter._getFailedTests(results));
        return allTests + totalInfo + failedTests;
    }

    private static _renderGroup(resultsGroup: IGroupResults, notSpaceLevel?: number): string {
        const str = [`\x1b[37m${resultsGroup.title || ''}\x1b[0m`];
        resultsGroup.results.forEach(element => {
            if ((element as IGroupResults).isGroup) {
                str.push(TextReporter._renderGroup(element as IGroupResults, notSpaceLevel));
            } else {
                const successful = (element as ITestResult).result?.successful;
                str.push(`  ${successful ? '\x1b[32m✔\x1b[0m' : '\x1b[31m✘\x1b[0m'} \x1b[2m\x1b[37m${element.title || ''}\x1b[0m`);
            }
        });
        
        if (notSpaceLevel > 0) {
            notSpaceLevel -= 1;
        }
        const body = notSpaceLevel > 0
            ? str.join('\n') 
            : str.join('\n')
                .split('\n')
                .map((str) => '  ' + str)
                .join('\n');
        return `${body}`
    }

    private static _renderTotalInfo(results: IGroupResults): string {
        return results.successCount === results.testsCount
            ? `\n\n\x1b[32m✔ Завершено ${results.successCount} модульных тестов\x1b[0m\n`
            : `\n\n\x1b[31m✘ Провалено ${results.testsCount - results.successCount} из ${results.testsCount} модульных тестов:\x1b[0m\n`
    }

    private static _renderFailedTests(failedTests: ITestResult[]): string {
        const str = failedTests.map((test) => {
            return `\n\x1b[37m${test.title}\n  \x1b[31m${test.result.errorDescription}\n    \x1b[2m\x1b[37m${test.result.stackTrace}\x1b[0m\n`
        });
        return str.join('');
    }
}