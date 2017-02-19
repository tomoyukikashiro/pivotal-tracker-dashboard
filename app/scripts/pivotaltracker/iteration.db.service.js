import DbBase from './db_base';
import {PT_ITERATION_SERVICE_SCHEMA} from './iteration.api.service';

export default class PtIterationDbService extends DbBase {
  constructor(Lovefield) {
    'ngInject';
    super(Lovefield, 'iteration', PT_ITERATION_SERVICE_SCHEMA);
  }
}
