import AssertResult from './AssertResult';

export type TTestBody = (done?: (errorText: string) => void) => void;

export interface ITest {
   title: string;
   file: string;

   run: () => Promise<void>;
}

export interface ITestResult {
   title: string;
   file: string;
   result: AssertResult;
}

export default class Test implements ITest{
   title: string; 
   file: string; 
   private _result: AssertResult;
   private _fn: TTestBody;
   private _ended: boolean = false;

   constructor(title: string, bodyFunction: TTestBody, file: string) {
      this.title = title;
      this.file = file;
      this._fn = bodyFunction;
   }

   async run(): Promise<void> {
      const isAsync = this._fn.length;
      try {
         if (isAsync) {
            await new Promise((resolve, reject) => {
               const done = (errorText: string) => {
                  if (errorText) {
                     // выход через done('описание ошибки')
                     reject(new AssertResult(false, errorText))
                  } else {
                     // ok
                     this._ended = true;
                     resolve(null);
                  }
               };

               this._fn(done);
            });
         } else {
            this._fn();
            this._ended = true;
         }
      } catch (error) {
         this._result = error instanceof Error
            ? new AssertResult(false, error.message, error.name, error.stack)
            : error;
         this._ended = true;
      }
   }

   getResult(): ITestResult {
      return {
         title: this.title,
         file: this.file,
         result: this._ended 
            ? this._result || ({successful: true} as AssertResult)
            : null
      };
   }

   reset(): void {
      this._ended = false;
   }
}