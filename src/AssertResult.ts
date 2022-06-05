export default class AssertResult {
   successful: boolean;
   errorDescription: string;
   actualValue: unknown;
   stackTrace: string;

   constructor(successful: boolean, message: string, actualValue?: unknown, stackTrace?: string){
      this.successful = successful;
      this.errorDescription = message;
      this.actualValue = actualValue;
      this.stackTrace = stackTrace || new Error().stack;
   }
}