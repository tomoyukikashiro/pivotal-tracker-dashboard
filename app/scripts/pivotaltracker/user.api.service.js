import ApiBase from './api_base';

/* eslint-disable camelcase */
const PtUserServiceSchema = {
  id: lf.Type.INTEGER,
  name: lf.Type.STRING,
  initial: lf.Type.STRING,
  username: lf.Type.STRING,
  time_zone: lf.Type.DATE_TIME,
  api_token: lf.Type.STRING,
  email: lf.Type.STRING,
  kind: lf.Type.STRING
};
/* eslint-enable camelcase */

export default class PtUserApiService extends ApiBase {

  constructor($resource) {
    'ngInject';
    super('/me');
    this.schema = PtUserServiceSchema;
    this._$resource = $resource;
  }

  get(token) {
    if (!this.$resource) {
      let actions = {get: {method: 'GET', headers: {'X-TrackerToken': token}}};
      this.$resource = this._$resource(this.apiUrl, {}, actions);
    }
    return this.$resource.get().$promise;
  }
}

