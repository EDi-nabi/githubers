export class Entities {
  static getEntities(index: string, data: any[]) {
    return data.reduce(
      (entities: any, item: any) => ({ ...entities, [item[index]]: item }), {}
    );
  }

  static getOrderedEntities(index: string, data: any[]) {
    return data.reduce(
      (entities: any, item: any) => ({ ...entities, [item[index]]: item }),
      { ...data }
    );
  }
}
