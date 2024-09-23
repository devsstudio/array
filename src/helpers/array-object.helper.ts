import { generateAlias } from "@devs-studio/string";

export interface ArrayUniqueItem {
  [key: string]: any,
}

export enum ArrayUniqueProcessType {
  NONE = "NONE",
  CASEINSENSITIVE = "CASEINSENSITIVE",
  ALIAS = "ALIAS",
  SPACES = "SPACES"
}

export class ArrayObjectHelper {
  static checkDuplicates(inputs: ArrayUniqueItem[], fields: string[], processType: ArrayUniqueProcessType = ArrayUniqueProcessType.NONE): boolean {

    var items = inputs.reduce<string[]>((acc, cur) => {
      // Verificar si cur es un objeto vacío
      if (Object.keys(cur).length === 0) {
        return acc; // Ignorar objetos vacíos
      }

      var parts = [];
      for (let field of fields) {
        var value = cur[field];
        if (value) {
          var str: string = value.toString()
          switch (processType) {
            case ArrayUniqueProcessType.ALIAS:
              parts.push(generateAlias(str));
              break;
            case ArrayUniqueProcessType.SPACES:
              parts.push(str.replace(/\s/g, ''));
              break;
            case ArrayUniqueProcessType.CASEINSENSITIVE:
              parts.push(str.toLowerCase());
              break;
            default:
              parts.push(value);
              break;
          }
        }
      }
      if (parts.length > 0) {
        acc.push(parts.join('|'));
      }
      return acc;
    }, []);

    var uniques = items.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

    return items.length === uniques.length;
  }
}