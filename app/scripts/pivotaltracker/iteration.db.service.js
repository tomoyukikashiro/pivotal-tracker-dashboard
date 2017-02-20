import DbBase from './db_base';
import {PT_ITERATION_SERVICE_SCHEMA} from './iteration.api.service';

export default class PtIterationDbService extends DbBase {
  constructor(moment, $q, Lovefield) {
    'ngInject';
    super(moment, $q, Lovefield, 'iteration', PT_ITERATION_SERVICE_SCHEMA);
  }
}
