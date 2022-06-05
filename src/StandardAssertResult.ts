import AssertResult from './AssertResult';

export default class StandartAssertResult extends AssertResult {
   expectedValue: any;

   constructor(successful: boolean, message: string, actualValue: unknown, expectedValue: unknown){
      super(successful, message, actualValue);
      this.expectedValue = expectedValue;
   }
}