import fs from 'fs';
import path from 'path';
import GroupTest, {THandller} from './GroupTest';
import Test, {TTestBody} from './Test';

export default class Loader {
   private static _currentFile: string;
   private static _currentGroup: GroupTest;

   /**
    * Получить все скрипты тестов относительно рабочей директории
    * @param paths 
    * @param scripts 
    * @returns 
    */
   static getAllScripts(paths: string[], scripts?: string[]): string[] {
      scripts = scripts || [];

      for (const dirOrFile of paths) {
         const resolvedPath = path.resolve(process.cwd(), dirOrFile);

         if (fs.statSync(resolvedPath).isDirectory()) {
            const files = fs.readdirSync(resolvedPath)
               .map((file) => path.join(resolvedPath, file));

            Loader.getAllScripts(files, scripts);
         } else if (resolvedPath.endsWith('.test.js')) {
            scripts.push(resolvedPath);
         }
      }

      return scripts;
   }

   static loadScripts(scripts: string[]): GroupTest {
      // корневая группа
      const root = new GroupTest();
      Loader._currentGroup = root;

      for (const script of scripts) {
         Loader._currentFile = script;
         require(script);
      }

      return root;
   }

   static loadGroupTest(title: string, groupBody: Function): void {
      const parent = Loader._currentGroup;
      const group = new GroupTest(title, parent, Loader._currentFile);
      Loader._currentGroup = group;
      groupBody();
      Loader._currentGroup = parent;
   }

   static loadTest(title: string, testBody: TTestBody): void {
      Loader._currentGroup.addTest(
         new Test(title, testBody, Loader._currentFile)
      );
   }

   static addHandler(handlerType: THandller, handler: Function): void {
      Loader._currentGroup.addHandler(handlerType, handler);
   }
}

export const describe = Loader.loadGroupTest;
export const suite = Loader.loadGroupTest;

export const it = Loader.loadTest;
export const test = Loader.loadTest;

export const before = Loader.addHandler.bind(Loader, 'before');
export const after = Loader.addHandler.bind(Loader, 'after');
export const beforeEach = Loader.addHandler.bind(Loader, 'beforeEach');
export const afterEach = Loader.addHandler.bind(Loader, 'afterEach');