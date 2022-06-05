import AssertResult from './AssertResult';
import Test, {ITest, ITestResult} from './Test';

export type THandller = 'before' | 'after' | 'beforeEach' | 'afterEach';
type TResult = ITestResult | IGroupResults;

export interface IGroupResults {
   isGroup: boolean;
   title: string;
   file: string;
   testsCount: number;
   successCount: number;
   results: TResult[];
}

export default class GroupTest implements ITest {
   title: string;
   file: string;

   private _groups: GroupTest[] = [];
   private _tests: Test[] = [];

   beforeGroupHandlers: Function[] = [];
   afterGroupHandlers: Function[] = [];

   beforeTestHandlers: Function[] = [];
   afterTestHandlers: Function[] = [];

   constructor(title?: string, parent?: GroupTest, file?: string) {
      this.file = file;
      this.title = title;

      if (parent) {
         parent.addGroup(this);

         this.beforeTestHandlers = [...parent.beforeTestHandlers];
         this.afterTestHandlers = [...parent.afterTestHandlers];
      }
   }

   async run(): Promise<void> {
      this._runHandlers('before');

      this._tests.forEach(async (test) => {
         this._runHandlers('beforeEach');
         await test.run();
         this._runHandlers('afterEach');
      });

      await Promise.all(this._groups.map(async (group) => await group.run()));
      this._runHandlers('after');
   }

   getResults(): IGroupResults {
      const results = [];
      let testsCount = this._tests.length;
      let successCount = 0;

      let testResult: ITestResult;
      this._tests.forEach((test) => {
         testResult = test.getResult();

         if (testResult.result?.successful) {
            successCount += 1;
         }
         results.push(testResult);
      });

      let groupResult: IGroupResults;
      this._groups.forEach((group) => {
         groupResult = group.getResults();
         results.push(groupResult);

         testsCount += groupResult.testsCount;
         successCount += groupResult.successCount;
      });

      return {
         isGroup: true,
         title: this.title,
         file: this.file,
         testsCount,
         successCount,
         results
      };
   }

   getTestsCount(): number {
      let testsCount = this._tests.length;
      this._groups.forEach((group) => {
         testsCount += group.getTestsCount();
      });

      return testsCount;
   }

   getSuccessTestCount(): number {
      let successCount = this._tests.reduce((count, test) => {
         return test.getResult().result?.successful ? count + 1 : count;
      }, 0);

      this._groups.forEach((group) => {
         successCount += group.getSuccessTestCount();
      });

      return successCount;
   }

   addGroup(group: GroupTest): void {
      this._groups.push(group);
   }

   addTest(test: Test): void {
      this._tests.push(test);
   }

   addHandler(handlerType: THandller, handler: Function): void {
      switch (handlerType) {
         case 'before':
            this.beforeGroupHandlers.push(handler);
            break;
         case 'after':
            this.afterGroupHandlers.push(handler);
            break;
         case 'beforeEach':
            this.beforeTestHandlers.push(handler);
            break;
         case 'afterEach':
            this.afterTestHandlers.push(handler);
            break;
      }
   }

   private _runHandlers(handlerType: THandller): void {
      let handlers;
      switch (handlerType) {
         case 'before':
            handlers = this.beforeGroupHandlers;
            break;
         case 'after':
            handlers = this.afterGroupHandlers;
            break;
         case 'beforeEach':
            handlers = this.beforeTestHandlers;
            break;
         case 'afterEach':
            handlers = this.afterTestHandlers;
            break;
      }

      handlers.forEach((handler) => {
         handler();
      })
   }
}