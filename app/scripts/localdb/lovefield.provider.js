class Lovefield {
  constructor(schemaBuilder, $q) {
    this.schemaBuilder = schemaBuilder;
    this.Types = lf.Type;
    this.$q = $q;
    this.connection = undefined;
    this.dbPromise = undefined;
  }
  getDb() {
    if (this.connection) {
      return this.$q.resolve(this.connection);
    }
    if (!this.dbPromise) {
      this.dbPromise = this.$q.defer();
      this.schemaBuilder.connect()
        .then(connection => {
          this.connection = connection;
          return this.dbPromise.resolve(this.connection);
        })
        .catch(error => {
          console.error(error);
          return this.dbPromise.reject(error);
        });
    }
    return this.dbPromise.promise;
  }
}

export default function LovefieldProvider() {
  let schemaBuilder;
  return {
    create(name, version) {
      schemaBuilder = lf.schema.create(name, version);
    },
    $get: function($q) {
      'ngInject';
      return new Lovefield(schemaBuilder, $q);
    }
  };
}
