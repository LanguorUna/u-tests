import AbstractReporter from './AbstractReporter';
import {IGroupResults} from './GroupTest';

export default class JsonReporter extends AbstractReporter {
    static render(results?: IGroupResults): string {
        return JSON.stringify(results);
    }

    static writeReportFile(results: IGroupResults, fileName: string = 'report.json') {
        super.writeReportFile(results, fileName);
    }
}