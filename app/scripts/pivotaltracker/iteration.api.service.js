import ApiBase from './api_base';

/* eslint-disable camelcase, key-spacing, no-multi-spaces */
export const PT_ITERATION_SERVICE_SCHEMA = {
  NUMBER:           {NAME: 'number',           TYPE: lf.Type.INTEGER},
  PROJECT_ID:       {NAME: 'project_id',       TYPE: lf.Type.INTEGER},
  LENGTH:           {NAME: 'length',           TYPE: lf.Type.INTEGER},
  TEAM_STRENGTH:    {NAME: 'team_strength',    TYPE: lf.Type.INTEGER},
  STORY_IDS:        {NAME: 'story_ids',        TYPE: lf.Type.OBJECT},
  START:            {NAME: 'start',            TYPE: lf.Type.DATE_TIME},
  FINISH:           {NAME: 'finish',           TYPE: lf.Type.DATE_TIME},
  VELOCITY:         {NAME: 'velocity',         TYPE: lf.Type.INTEGER},
  POINTS:           {NAME: 'points',           TYPE: lf.Type.INTEGER},
  ACCEPTED_POINTS:  {NAME: 'accepted_points',  TYPE: lf.Type.INTEGER},
  EFFECTIVE_POINTS: {NAME: 'effective_points', TYPE: lf.Type.INTEGER}
};
/* eslint-enable camelcase key-spacing, no-multi-spaces */

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
