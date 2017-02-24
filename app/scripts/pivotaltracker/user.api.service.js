import ApiBase from './api_base';

/* eslint-disable camelcase, key-spacing, no-multi-spaces */
export const PT_USER_SERVICE_SCHEMA = {
  ID:        {NAME: 'id',        TYPE: lf.Type.INTEGER, PRIMARY: true},
  NAME:      {NAME: 'name',      TYPE: lf.Type.STRING},
  INITIALS:  {NAME: 'initials',  TYPE: lf.Type.STRING},
  USERNAME:  {NAME: 'username',  TYPE: lf.Type.STRING},
  TIME_ZONE: {NAME: 'time_zone', TYPE: lf.Type.OBJECT, NULLABLE: true},
  API_TOKEN: {NAME: 'api_token', TYPE: lf.Type.STRING, NULLABLE: true},
  EMAIL:     {NAME: 'email',     TYPE: lf.Type.STRING}
};
/* eslint-enable camelcase, key-spacing, no-multi-spaces */

export class PtUserApiService extends ApiBase {

  constructor($resource) {
    'ngInject';
    super('/projects/:projectId/memberships');
    this.schema = PT_USER_SERVICE_SCHEMA;
    this._$resource = $resource;
  }

  get(token, param) {
    if (!this.$resource) {
      let actions = {get: {method: 'GET', isArray: true, headers: {'X-TrackerToken': token}}};
      this.$resource = this._$resource(this.apiUrl, {projectId: '@projectId'}, actions);
    }
    return this.$resource.get(param).$promise.then(users => {
      return users.map(user => {
        return user.person;
      });
    });
  }
}

