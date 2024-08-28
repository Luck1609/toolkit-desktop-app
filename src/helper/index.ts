import { debounce }  from "lodash";

class HelperFunc {
  debounce = <FunctionReturnType extends (...args: any) => void>(
    func: FunctionReturnType,
    time = 250
  ) => debounce(func, time);

  
  isJsonString = (string: string) => {
    try {
      // console.log('type of json string', typeof(string), ))
      if (!isNaN(parseInt(string))) throw new Error("not a string");

      return JSON.parse(string);
    } catch (e) {
      return [];
    }
  };

  generateAlphabets = Array.from(Array(26).keys())
    .reduce((alphabets: { label: string;  value: string}[]) => {
      const letter = String.fromCharCode(65 + alphabets.length);
      
      console.log('Letter is equal to I', 'I' === letter, letter, '=>', alphabets.length,)

      return alphabets.length === 8 ? [...alphabets] : [
        ...alphabets,
        { label: `Block ${letter}`, value: `Block ${letter}` },
      ];
    }, []);
}

const Helper = new HelperFunc();

export default Helper