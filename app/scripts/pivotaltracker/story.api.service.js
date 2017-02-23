import ApiBase from './api_base';

/* eslint-disable camelcase, key-spacing, no-multi-spaces */
export const PT_STORY_SERVICE_SCHEMA = {
  ID:              {NAME: 'id',              TYPE: lf.Type.INTEGER, PRIMARY: true},
  PROJECT_ID:      {NAME: 'project_id',      TYPE: lf.Type.INTEGER},
  DESCRIPTION:     {NAME: 'description',     TYPE: lf.Type.STRING, NULLABLE: true},
  STORY_TYPE:      {NAME: 'story_type',      TYPE: lf.Type.STRING},
  CURRENT_STATE:   {NAME: 'current_state',   TYPE: lf.Type.STRING},
  ESTIMATE:        {NAME: 'estimate',        TYPE: lf.Type.INTEGER, NULLABLE: true},
  ACCEPTED_AT:     {NAME: 'accepted_at',     TYPE: lf.Type.DATE_TIME},
  // DEADLINE:        {NAME: 'deadline',        TYPE: lf.Type.DATE_TIME},
  REQUESTED_BY_ID: {NAME: 'requested_by_id', TYPE: lf.Type.INTEGER},
  OWNER_IDS:       {NAME: 'owner_ids',       TYPE: lf.Type.OBJECT},
  LABEL_IDS:       {NAME: 'label_ids',       TYPE: lf.Type.OBJECT},
  // FOLLOWER_IDS:    {NAME: 'follower_ids',    TYPE: lf.Type.OBJECT},
  // COMMENT_IDS:     {NAME: 'comment_ids',     TYPE: lf.Type.OBJECT},
  CREATED_AT:      {NAME: 'created_at',      TYPE: lf.Type.DATE_TIME},
  UPDATED_AT:      {NAME: 'updated_at',      TYPE: lf.Type.DATE_TIME},
  // BEFORE_ID:       {NAME: 'before_id',       TYPE: lf.Type.INTEGER},
  // AFTER_ID:        {NAME: 'after_id',        TYPE: lf.Type.INTEGER},
  URL:             {NAME: 'url',             TYPE: lf.Type.STRING}
};
/* eslint-enable camelcase, key-spacing, no-multi-spaces */

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
