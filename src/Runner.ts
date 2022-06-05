import { IGroupResults } from './GroupTest';
import HtmlReporter from './HtmlReporter';
import JsonReporter from './JsonReporter';
import Loader from './Loader';
import TextReporter from './TextReporter';

type IOutputKeys = `--${'json' | 'html' | 'txt'}`;
export type TConfigKeys = IOutputKeys | '--noConsole';

interface IOutput {
   filePath?: string;
}

export interface IConfig {
   paths: string[];
   html?: IOutput;
   txt?: IOutput;
   console?: boolean;
   json?: IOutput;
}

export default class Runner {
   static prepareConfig(args: string[]): IConfig {
      if (args.length < 3) {
         throw 'Не указаны пути к тестам';
      }

      // 0-й аргумент node.exe
      const config: IConfig = {
         paths: args[2].split(',').map((path) => path.trim()),
         console: true
      };

      let arg: TConfigKeys | string;
      let prevKey: TConfigKeys;

      for (let i = 3; i < args.length; i++) {
         arg = args[i];
         switch (arg) {
            case '--json':
               config.json = {};
               prevKey = '--json';
               break;
            case '--html':
               config.html = {};
               prevKey = '--html';
               break;
            case '--txt':
               config.txt = {};
               prevKey = '--txt';
               break;
            case '--noConsole':
               config.console = false;
               break;
            default:
               if (prevKey) {
                  (config[prevKey] as IOutput).filePath = arg;
               }
         }
      }

      return config;
   }

   static async run(config: IConfig = { paths: [] }): Promise<IGroupResults> {
      const testFiles = Loader.getAllScripts(config.paths);

      const rootGroup = Loader.loadScripts(testFiles);
      await rootGroup.run();
      const results = rootGroup.getResults();

      if (config.console) {
         console.log(TextReporter.render(results));
      }

      if (config.json) {
         JsonReporter.writeReportFile(results, config.json.filePath);
      }
      if (config.html) {
         HtmlReporter.writeReportFile(results, config.html.filePath);
      }
      if (config.txt) {
         TextReporter.writeReportFile(results, config.txt.filePath);
      }

      return results;
   }
}