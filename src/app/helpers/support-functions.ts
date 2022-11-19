export class SupportFunctions {
    public static isNumber(val: any): boolean {
      return val || val === 0 ? typeof val === 'number' : false;
    }
}