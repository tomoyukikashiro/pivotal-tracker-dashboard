class Lovefield {
  constructor(schemaBuilder) {
    this.schemaBuilder = schemaBuilder;
    this.Types = lf.Type;
  }
}

export default function LovefieldProvider() {
  let schemaBuilder;
  return {
    create(name, version) {
      schemaBuilder = lf.schema.create(name, version);
    },
    $get: function() {
      return new Lovefield(schemaBuilder);
    }
  };
}
