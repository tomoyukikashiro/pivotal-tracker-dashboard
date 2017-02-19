import DbBase from './db_base';
import {PT_ITERATION_SERVICE_SCHEMA} from './iteration.api.service';

export default class PtIterationDbService extends DbBase {
  constructor(LovefieldService) {
    'ngInject';
    super(LovefieldService.schemaBuilder, 'user', PT_ITERATION_SERVICE_SCHEMA);
  }
}
