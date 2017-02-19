import ApiBase from './api_base';

/* eslint-disable camelcase */
const PtProjectServiceSchema = {
  id: lf.Type.INTEGER,
  name: lf.Type.STRING,
  status: lf.Type.STRING,
  version: lf.Type.INTEGER,
  iteration_length: lf.Type.INTEGER,
  week_start_day: lf.Type.STRING,
  point_scale: lf.Type.STRING,
  point_scale_is_custom: lf.Type.BOOLEAN,
  bugs_and_chores_are_estimatable: lf.Type.BOOLEAN,
  automatic_planning: lf.Type.BOOLEAN,
  enable_tasks: lf.Type.BOOLEAN,
  start_date: lf.Type.DATE_TIME,
  time_zone: lf.Type.STRING,
  velocity_averaged_over: lf.Type.INTEGER,
  shown_iterations_start_time: lf.Type.DATE_TIME,
  start_time: lf.Type.DATE_TIME,
  number_of_done_iterations_to_show: lf.Type.INTEGER,
  description: lf.Type.STRING,
  initial_velocity: lf.Type.INTEGER,
  project_type: lf.Type.STRING,
  public: lf.Type.BOOLEAN,
  current_iteration_number: lf.Type.INTEGER,
  current_standard_deviation: lf.Type.INTEGER,
  current_velocity: lf.Type.INTEGER,
  current_volatility: lf.Type.INTEGER,
  account_id: lf.Type.INTEGER,
  story_ids: lf.Type.OBJECT,
  epic_ids: lf.Type.OBJECT,
  membership_ids: lf.Type.OBJECT,
  label_ids: lf.Type.OBJECT,
  iteration_override_numbers: lf.Type.OBJECT,
  created_at: lf.Type.DATE_TIME,
  updated_at: lf.Type.DATE_TIME
};
/* eslint-anable camelcase */

export default class PtProjectApiService extends ApiBase {
  constructor($resource) {
    'ngInject';
    super('/project');
    this.schema = PtProjectServiceSchema;
    this._$resource = $resource;
  }

  get(token, param) {
    if (!this.$resource) {
      let actions = {get: {method: 'GET', isArray: true, headers: {'X-TrackerToken': token}}};
      this.$resource = this._$resource(this.apiUrl, {}, actions);
    }
    return this.$resource.get(param).$promise;
  }
}
