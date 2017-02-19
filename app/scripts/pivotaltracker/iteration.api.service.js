import ApiBase from './api_base';

/* eslint-disable camelcase */
const PtStoryServiceSchema = {
};
/* eslint-enable camelcase */

export default class PtIterationApiService extends ApiBase {
  constructor($resouce) {
    'ngInject';
    super('/projects/{projectId}/iterations');
    this.schema = PtStoryServiceSchema;
    this._$resource = $resouce;
  }

  get(token, param) {
    if (!this.$resource) {
      let actions = {get: {method: 'GET', isArray: true, headers: {'X-TrackerToken': token}}};
      this.$resource = this._$resource(this.apiUrl, {projectId: '@projectId'}, actions);
    }
    return this.$resource.get(param).$promise;
  }
}
