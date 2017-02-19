export default class DbBase {
  constructor(dbService, tableName, schemas) {
    this.dbService = dbService;
    this.tableName = tableName;
    this.schemas = schemas;
  }

  createTable() {
    let table = this.dbService.schemaBuilder.createTable(this.tableName);
    for (let schema in this.schemas) {
      if (this.schemas.hasOwnProperty(schema)) {
        table.addColumn(schema.NAME, schema[schema.TYPE]);
      }
    }
    return table;
  }

}
