import ApiBase from './api_base';

/* eslint-disable camelcase */
export const PT_ITERATION_SERVICE_SCHEMA = {
  number: lf.Type.INTEGER,
  project_id: lf.Type.INTEGER,
  length: lf.Type.INTEGER,
  team_strength: lf.Type.INTEGER,
  story_ids: lf.Type.OBJECT,
  start: lf.Type.DATE_TIME,
  finish: lf.Type.DATE_TIME,
  velocity: lf.Type.INTEGER,
  points: lf.Type.INTEGER,
  accepted_points: lf.Type.INTEGER,
  effective_points: lf.Type.INTEGER
};
/* eslint-enable camelcase */

export class PtIterationApiService extends ApiBase {
  constructor($resouce) {
    'ngInject';
    super('/projects/{projectId}/iterations');
    this.schema = PT_ITERATION_SERVICE_SCHEMA;
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
