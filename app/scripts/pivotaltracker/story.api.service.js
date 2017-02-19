import ApiBase from './api_base';

/* eslint-disable camelcase */
export const PT_STORY_SERVICE_SCHEMA = {
  id: lf.Type.INTEGER,
  project_id: lf.Type.INTEGER,
  description: lf.Type.STRING,
  story_type: lf.Type.STRING,
  current_state: lf.Type.STRING,
  estimate: lf.Type.INTEGER,
  accepted_at: lf.Type.DATE_TIME,
  deadline: lf.Type.DATE_TIME,
  requested_by_id: lf.Type.INTEGER,
  owner_ids: lf.Type.OBJECT,
  label_ids: lf.Type.OBJECT,
  follower_ids: lf.Type.OBJECT,
  comment_ids: lf.Type.OBJECT,
  created_at: lf.Type.DATE_TIME,
  updated_at: lf.Type.DATE_TIME,
  before_id: lf.Type.INTEGER,
  after_id: lf.Type.INTEGER,
  url: lf.Type.STRING
};
/* eslint-enable camelcase */

export class PtStoryApiService extends ApiBase {
  constructor($resource) {
    'ngInject';
    super('/projects/:projectId/stories');
    this.schema = PT_STORY_SERVICE_SCHEMA;
    this._$resource = $resource;
  }

  get(token, param) {
    if (!this.$resource) {
      let actions = {get: {method: 'GET', isArray: true, headers: {'X-TrackerToken': token}}};
      this.$resource = this._$resource(this.apiUrl, {projectId: '@projectId'}, actions);
    }
    return this.$resource.get(param).$promise;
  }
}
