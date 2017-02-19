import ApiBase from './api_base';

/* eslint-disable camelcase */
export const PT_USER_SERVICE_SCHEMA = {
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

export class PtUserApiService extends ApiBase {

  constructor($resource) {
    'ngInject';
    super('/me');
    this.schema = PT_USER_SERVICE_SCHEMA;
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

