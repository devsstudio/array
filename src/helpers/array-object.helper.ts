import { generateAlias } from "@devs-studio/string";

export interface ArrayUniqueItem {
  [key: string]: any,
}

export enum ArrayUniqueProcessType {
  CASEINSENSITIVE = "CASEINSENSITIVE",
  ALIAS = "ALIAS",
  SPACES = "SPACES"
}

export class ArrayObjectHelper {
  static checkDuplicates(inputs: ArrayUniqueItem[], fields: string[], processType: ArrayUniqueProcessType): boolean {

    var items = inputs.reduce<string[]>((acc, cur) => {
      // Verificar si cur es un objeto vacío
      if (Object.keys(cur).length === 0) {
        return acc; // Ignorar objetos vacíos
      }

      var parts = [];
      for (let field of fields) {
        var value = cur[field].toLowerCase();
        switch (processType) {
          case ArrayUniqueProcessType.ALIAS:
            parts.push(generateAlias(value));
            break;
          case ArrayUniqueProcessType.SPACES:
            parts.push(value.replace(/\s/g, ''));
            break;
          default:
            parts.push(value);
            break;
        }
      }
      acc.push(parts.join('|'));
      return acc;
    }, []);

    var uniques = items.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

    return items.length === uniques.length;
  }
}