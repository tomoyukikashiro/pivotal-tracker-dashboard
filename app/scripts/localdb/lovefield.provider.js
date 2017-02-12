import LoveFieldService from './lovefield.service';

export default class LovefieldProvider {
  create(name, version) {
    this.Types = lf.Type;
    this.schemaBuilder = lf.schema.create(name, version);
    return this.schemaBuilder;
  }
  $get() {
    return new LoveFieldService(this.schemaBuilder);
  }
}
