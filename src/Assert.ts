import AssertResult from "./AssertResult";
import StandartAssertResult from "./StandardAssertResult";

export default class Assert {

   static equal(actualValue, expectedValue, message?) {
      const successful = actualValue == expectedValue;

      if (!successful) {
         throw new StandartAssertResult(
            successful, message || `${actualValue} не равен ${expectedValue}`, actualValue, expectedValue,
         );
      }
   }

   static notEqual(actualValue, expectedValue, message?) {
      const successful = actualValue != expectedValue;

      if (!successful) {
         throw new StandartAssertResult(
            successful, message || `${actualValue} равен ${expectedValue}`, actualValue, expectedValue,
         );
      }
   }

   static strictEqual(actualValue, expectedValue, message?) {
      const successful = actualValue === expectedValue;

      if (!successful) {
         throw new StandartAssertResult(
            successful, message || `${actualValue} строго не равен ${expectedValue}`, actualValue, expectedValue,
         );
      }
   }

   static notStrictEqual(actualValue, expectedValue, message?) {
      const successful = actualValue !== expectedValue;

      if (!successful) {
         throw new StandartAssertResult(
            successful, message || `${actualValue} строго равен ${expectedValue}`, actualValue, expectedValue,
         );
      }
   }

   static deepEqual(actualValue, expectedValue, message?) {

      if ((actualValue == null) || (expectedValue == null)) {
         throw new StandartAssertResult(
            false, message || `${actualValue} или ${expectedValue} имеют тип данных null`, actualValue, expectedValue,
         );
      }

      if (actualValue !== expectedValue) {

         if (typeof (actualValue) != typeof (expectedValue)) {
            throw new StandartAssertResult(
               false, message || `${actualValue} и ${expectedValue} имеют разные типы данных`, actualValue, expectedValue,
            );

         } else if ((typeof (actualValue) == 'object') && (typeof (expectedValue) == 'object')) {
            const keysActualValue = Object.keys(actualValue).sort();
            const keysExpectedValue = Object.keys(expectedValue).sort();

            if (keysActualValue.length != keysExpectedValue.length) {
               throw new StandartAssertResult(
                  false, message || `Объекты ${JSON.stringify(actualValue)} и ${JSON.stringify(expectedValue)} имеют разное количество ключей`, actualValue, expectedValue,
               );
            }

            for (let index = 0; index < keysActualValue.length; index++) {

               if (keysActualValue[index] != keysExpectedValue[index]) {
                  throw new StandartAssertResult(
                     false, message || `Объекты ${JSON.stringify(actualValue)} и ${JSON.stringify(expectedValue)} имеют разные ключи`, actualValue, expectedValue,
                  );
               }
            }

            const valuesKeysActualValue = keysActualValue.map((key) => actualValue[key]);
            const valuesKeysExpectedValue = keysExpectedValue.map((key) => expectedValue[key]);

            for (let index = 0; index < valuesKeysActualValue.length; index++) {
               Assert.deepEqual(
                  valuesKeysActualValue[index],
                  valuesKeysExpectedValue[index],
                  message || `Объекты ${JSON.stringify(actualValue)} и ${JSON.stringify(expectedValue)} имеют разные значения поля`
               );
            }

         } else if ((typeof (actualValue) == 'number') && (typeof (expectedValue) == 'number')) {

            if (actualValue !== expectedValue) {
               throw new StandartAssertResult(
                  false, message || `${actualValue} не равно ${expectedValue}`, actualValue, expectedValue,
               );
            }

         } else if ((typeof (actualValue) == 'string') && (typeof (expectedValue) == 'string')) {

            if (actualValue !== expectedValue) {
               throw new StandartAssertResult(
                  false, message || `Строка \'${actualValue}\' не равна строке \'${expectedValue}\'`, actualValue, expectedValue,
               );
            }
         }
      }
   }

   static isAbove(valueToCheck, valueToBeAbove, message?) {
      if (!(valueToCheck > valueToBeAbove)) {
         throw new AssertResult(
            false, message || `${valueToCheck} не больше ${valueToBeAbove}`, valueToCheck
         );
      }
   }

   static isAtLeast(valueToCheck, valueToBeAtLeast, message?) {
      if (!(valueToCheck >= valueToBeAtLeast)) {
         throw new AssertResult(
            false, message || `${valueToCheck} больше ${valueToBeAtLeast}`, valueToCheck
         );
      }
   }

   static isBelow(valueToCheck, valueToBeBelow, message?) {
      if (!(valueToCheck < valueToBeBelow)) {
         throw new AssertResult(
            false, message || `${valueToCheck} не меньше ${valueToBeBelow}`, valueToCheck
         );
      }
   }

   static isAtMost(valueToCheck, valueToBeAtMost, message?) {
      if (!(valueToCheck < valueToBeAtMost)) {
         throw new AssertResult(
            false, message || `${valueToCheck} меньше ${valueToBeAtMost}`, valueToCheck
         );
      }
   }

   static isTrue(value, message?) {
      if (value !== true) {
         throw new AssertResult(
            false, message || `Не является истиной`, value
         );
      }
   }

   static isNotTrue(value, message?) {
      if (value === true) {
         throw new AssertResult(
            false, message || `Является истиной`, value
         );
      }
   }

   static isFalse(value, message?) {
      if (value !== false) {
         throw new AssertResult(
            false, message || `Не является ложью`, value
         );
      }
   }

   static isNotFalse(value, message?) {
      if (value === false) {
         throw new AssertResult(
            false, message || `Является ложью`, value
         );
      }
   }

   static isNull(value, message?) {
      if (value !== null) {
         throw new AssertResult(
            false, message || `Не является null`, value
         );
      }
   }

   static isNotNull(value, message?) {
      if (value === null) {
         throw new AssertResult(
            false, message || `Является null`, value
         );
      }
   }

   static isNaN(value, message?) {
      if (!Number.isNaN(value)) {
         throw new AssertResult(
            false, message || `Не является NaN`, value
         );
      }
   }

   static isNotNaN(value, message?) {
      if (Number.isNaN(value)) {
         throw new AssertResult(
            false, message || `Является NaN`, value
         );
      }
   }

   static isUndefined(value, message?){
      if (!(value == undefined)) {
         throw new AssertResult(
            false, message || `Не является undefined`, value
         );
      }
   }

   static isDefined(value, message?){
      if (!(value != undefined)) {
         throw new AssertResult(
            false, message || `Является undefined`, value
         );
      }
   }

   static exists(value, message?){
      if(!((value !== null) && (value !== undefined))){
         throw new AssertResult(
            false, message || `Является равным либо null, либо undefined`, value
         );
      }
   }

   static notExists(value, message?){
      if(!((value === null) || (value === undefined))){
         throw new AssertResult(
            false, message || `Не является равным ни null, ни undefined`, value
         );
      }
   }
}