export default class DbBase {
  constructor(tableName, schemas) {
    this.tableName = tableName;
    this.schemas = schemas;
  }

  createTable(schemaBuilder) {
    let sb = schemaBuilder.createTable(this.tableName);
    for (let name in this.schemas) {
      if (this.schemas.hasOwnProperty(name)) {
        sb.addColumn(name, this.schemas[name]);
      }
    }
  }

}
