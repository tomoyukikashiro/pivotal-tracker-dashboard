import ApiBase from './api_base';

/* eslint-disable camelcase, key-spacing, no-multi-spaces */
export const PT_PROJECT_SERVICE_SCHEMA = {
  ID:                               {NAME: 'id',                                TYPE: lf.Type.INTEGER},
  NAME:                             {NAME: 'name',                              TYPE: lf.Type.STRING},
  STATUS:                           {NAME: 'status',                            TYPE: lf.Type.STRING},
  VERSION:                          {NAME: 'version',                           TYPE: lf.Type.INTEGER},
  ITERATION_LENGTH:                 {NAME: 'iteration_length',                  TYPE: lf.Type.INTEGER},
  WEEK_START_DAY:                   {NAME: 'week_start_day',                    TYPE: lf.Type.STRING},
  POINT_SCALE:                      {NAME: 'point_scale',                       TYPE: lf.Type.STRING},
  POINT_SCALE_IS_CUSTOM:            {NAME: 'point_scale_is_custom',             TYPE: lf.Type.BOOLEAN},
  BUGS_AND_CHORES_ARE_ESTIMATABLE:  {NAME: 'bugs_and_chores_are_estimatable',   TYPE: lf.Type.BOOLEAN},
  AUTOMATIC_PLANNING:               {NAME: 'automatic_planning',                TYPE: lf.Type.BOOLEAN},
  ENABLE_TASKS:                     {NAME: 'enable_tasks',                      TYPE: lf.Type.BOOLEAN},
  START_DATE:                       {NAME: 'start_date',                        TYPE: lf.Type.DATE_TIME},
  TIME_ZONE:                        {NAME: 'time_zone',                         TYPE: lf.Type.STRING},
  VELOCITY_AVERAGED_OVER:           {NAME: 'velocity_averaged_over',            TYPE: lf.Type.INTEGER},
  SHOWN_ITERATIONS_START_TIME:      {NAME: 'shown_iterations_start_time',       TYPE: lf.Type.DATE_TIME},
  START_TIME:                       {NAME: 'start_time',                        TYPE: lf.Type.DATE_TIME},
  NUMBER_OF_DONE_ITERATIONS_TO_SHOW:{NAME: 'number_of_done_iterations_to_show', TYPE: lf.Type.INTEGER},
  DESCRIPTION:                      {NAME: 'description',                       TYPE: lf.Type.STRING},
  INITIAL_VELOCITY:                 {NAME: 'initial_velocity',                  TYPE: lf.Type.INTEGER},
  PROJECT_TYPE:                     {NAME: 'project_type',                      TYPE: lf.Type.STRING},
  PUBLIC:                           {NAME: 'public',                            TYPE: lf.Type.BOOLEAN},
  CURRENT_ITERATION_NUMBER:         {NAME: 'current_iteration_number',          TYPE: lf.Type.INTEGER},
  CURRENT_STANDARD_DEVIATION:       {NAME: 'current_standard_deviation',        TYPE: lf.Type.INTEGER},
  CURRENT_VELOCITY:                 {NAME: 'current_velocity',                  TYPE: lf.Type.INTEGER},
  CURRENT_VOLATILITY:               {NAME: 'current_volatility',                TYPE: lf.Type.INTEGER},
  ACCOUNT_ID:                       {NAME: 'account_id',                        TYPE: lf.Type.INTEGER},
  STORY_IDS:                        {NAME: 'story_ids',                         TYPE: lf.Type.OBJECT},
  EPIC_IDS:                         {NAME: 'epic_ids',                          TYPE: lf.Type.OBJECT},
  MEMBERSHIP_IDS:                   {NAME: 'membership_ids',                    TYPE: lf.Type.OBJECT},
  LABEL_IDS:                        {NAME: 'label_ids',                         TYPE: lf.Type.OBJECT},
  ITERATION_OVERRIDE_NUMBERS:       {NAME: 'iteration_override_numbers',        TYPE: lf.Type.OBJECT},
  CREATED_AT:                       {NAME: 'created_at',                        TYPE: lf.Type.DATE_TIME},
  UPDATED_AT:                       {NAME: 'updated_at',                        TYPE: lf.Type.DATE_TIME}
};
/* eslint-enable camelcase, key-spacing, no-multi-spaces */

export class PtProjectApiService extends ApiBase {
  constructor($resource) {
    'ngInject';
    super('/project');
    this.schema = PT_PROJECT_SERVICE_SCHEMA;
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
