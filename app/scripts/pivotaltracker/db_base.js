export default class DbBase {
  constructor(dbService, tableName, schemas) {
    this.dbService = dbService;
    this.tableName = tableName;
    this.schemas = schemas;
  }

  createTable() {
    let table = this.dbService.schemaBuilder.createTable(this.tableName);
    for (let key in this.schemas) {
      if (this.schemas.hasOwnProperty(key)) {
        table.addColumn(this.schemas[key].NAME, this.schemas[key].TYPE);
      }
    }
    return table;
  }

}
