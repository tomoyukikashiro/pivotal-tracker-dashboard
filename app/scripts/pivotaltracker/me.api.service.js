import {PT_USER_SERVICE_SCHEMA} from './user.api.service';
import ApiBase from './api_base';

export class PtMeApiService extends ApiBase {

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

