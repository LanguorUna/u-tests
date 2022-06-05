import {writeFileSync} from 'fs';
import {IGroupResults} from './GroupTest';
import { ITestResult } from './Test';

export default abstract class AbstractReporter {
    /**
     * Получить представление результатов прохождения тестов
     */
    static render(results?: IGroupResults): string {
        return '';
    }

    /**
     * Записать отчет в файл
     * @param fileName
     */
    static writeReportFile(results: IGroupResults, fileName: string = `report.txt`) {
        writeFileSync(fileName, this.render(results));
    }
    
    protected static _getFailedTests(resultsGroup: IGroupResults, failedTests?: ITestResult[]): ITestResult[] {
        const tests = failedTests || [];
        resultsGroup.results.forEach(element => {
            if ((element as IGroupResults).isGroup) {
                AbstractReporter._getFailedTests(element as IGroupResults, tests);
            } else {
                if (!(element as ITestResult).result?.successful) {
                    tests.push(element as ITestResult);
                }
            }
        });

        return tests;
    }
}