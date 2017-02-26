import constants from '../constants';

export default class ApiBase {
  constructor(path) {
    this.apiUrl = this.getApiUrl(path);
    this.fields = [];
  }

  getApiUrl(path) {
    return constants.PIVOTAL_TRACKER_API_BASE_URL + path;
  }

  getFields() {
    return [':default'].concat(this.fields).join(',');
  }

  static get schema() {
    return this.schema;
  }
}
