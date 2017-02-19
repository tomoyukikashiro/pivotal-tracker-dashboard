import constants from '../constants';

export default class ApiBase {
  constructor(path) {
    this.apiUrl = constants.PIVOTAL_TRACKER_API_BASE_URL + path;
  }

  static get schema() {
    return this.schema;
  }
}
