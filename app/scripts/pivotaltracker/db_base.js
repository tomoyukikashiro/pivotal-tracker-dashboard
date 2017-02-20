export default class DbBase {
  constructor(moment, $q, dbService, tableName, schemas) {
    this.moment = moment;
    this.$q = $q;
    this.dbService = dbService;
    this.tableName = tableName;
    this.schemas = schemas;
  }

  getDb() {
    return this.dbService.getDb();
  }

  getTable() {
    return this.dbService.getDb()
      .then(db => {
        return db.getSchema().table(this.tableName);
      })
      .catch(error => {
        return error;
      });
  }

  insertOrReplace(data) {
    return this.getTable()
      .then(table => {
        let _data = this._convertData2Rows(data);
        let rows = _data.map(obj => {
          return table.createRow(obj);
        });
        return this.getDb()
          .then(db => {
            return db.insertOrReplace().into(table).values(rows).exec();
          });
      });
  }

  /*
   * To modify row data if you want
   */
  _modifyRowData(row) {
    return row;
  }

  _convertData2Rows(data) {
    if (angular.isArray(data)) {
      return this._convertListData2Rows(data);
    }
    return [this._convertOneData2Row(data)];
  }

  _convertListData2Rows(data) {
    return data.map(obj => {
      return this._convertOneData2Row(obj);
    });
  }

  _convertOneData2Row(data) {
    let row = Object.create(null);
    for (let key in this.schemas) {
      if (this.schemas.hasOwnProperty(key)) {
        if (this.schemas[key].TYPE === this.dbService.Types.DATE_TIME) {
          row[this.schemas[key].NAME] = this.moment(data[this.schemas[key].NAME]).toDate();
        } else {
          row[this.schemas[key].NAME] = data[this.schemas[key].NAME];
        }
      }
    }
    return this._modifyRowData(row);
  }

  createTable() {
    let primaryKeys = [];
    let table = this.dbService.schemaBuilder.createTable(this.tableName);
    for (let key in this.schemas) {
      if (this.schemas.hasOwnProperty(key)) {
        table.addColumn(this.schemas[key].NAME, this.schemas[key].TYPE);
        if (this.schemas[key].PRIMARY) {
          primaryKeys.push(this.schemas[key].NAME);
        }
      }
    }
    table.addPrimaryKey(primaryKeys);
    return table;
  }

}
