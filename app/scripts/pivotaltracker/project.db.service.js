import DbBase from './db_base';
import {PT_PROJECT_SERVICE_SCHEMA} from './project.api.service';

export default class PtProjectDbService extends DbBase {
  constructor(LovefieldService) {
    'ngInject';
    super(LovefieldService.schemaBuilder, 'user', PT_PROJECT_SERVICE_SCHEMA);
  }
}
