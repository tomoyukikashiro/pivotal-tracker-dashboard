import ApiBase from './api_base';

/* eslint-disable camelcase, key-spacing, no-multi-spaces */
export const PT_USER_SERVICE_SCHEMA = {
  ID:        {NAME: 'id',        TYPE: lf.Type.INTEGER},
  NAME:      {NAME: 'name',      TYPE: lf.Type.STRING},
  INITIAL:   {NAME: 'initial',   TYPE: lf.Type.STRING},
  USERNAME:  {NAME: 'username',  TYPE: lf.Type.STRING},
  TIME_ZONE: {NAME: 'time_zone', TYPE: lf.Type.DATE_TIME},
  API_TOKEN: {NAME: 'api_token', TYPE: lf.Type.STRING},
  EMAIL:     {NAME: 'email',     TYPE: lf.Type.STRING},
  KIND:      {NAME: 'kind',      TYPE: lf.Type.STRING}
};
/* eslint-enable camelcase, key-spacing, no-multi-spaces */

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

