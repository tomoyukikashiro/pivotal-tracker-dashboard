import ApiBase from './api_base';

/* eslint-disable camelcase, key-spacing, no-multi-spaces */
export const PT_STORY_TRANSITION_SERVICE_SCHEMA = {
  PROJECT_ID:      {NAME: 'project_id',      TYPE: lf.Type.INTEGER},
  STORY_ID:        {NAME: 'story_id',        TYPE: lf.Type.INTEGER},
  STATE:           {NAME: 'state',           TYPE: lf.Type.STRING},
  OCCURRED_AT:     {NAME: 'occurred_at',     TYPE: lf.Type.DATE_TIME, PRIMARY: true},
  PERFORMED_BY_ID: {NAME: 'performed_by_id', TYPE: lf.Type.INTEGER}
};
/* eslint-enable camelcase, key-spacing, no-multi-spaces */

export class PtStoryTransitionApiService extends ApiBase {
  constructor($resource) {
    'ngInject';
    super('/projects/:projectId/story_transitions');
    this.schema = PT_STORY_TRANSITION_SERVICE_SCHEMA;
    this._$resource = $resource;
  }

  get(token, param) {
    if (!this.$resource) {
      let actions = {get: {method: 'GET', isArray: true, headers: {'X-TrackerToken': token}}};
      this.$resource = this._$resource(this.apiUrl, {projectId: '@projectId'}, actions);
    }
    return this.$resource.get(param).$promise;
  }

  getAll(token, project, transitions) {
    transitions = transitions || [];
    return this.get(token, {projectId: project.id, limit: 100, offset: transitions.length})
      .then(_transitions => {
        transitions = transitions.concat(_transitions);
        if (_transitions.length !== 0) {
          return this.getAll(token, project, transitions);
        }
        return transitions;
      });
  }

}
