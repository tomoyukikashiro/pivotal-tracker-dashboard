import DbBase from './db_base';
import {PT_PROJECT_SERVICE_SCHEMA} from './project.api.service';

export default class PtProjectDbService extends DbBase {
  constructor(Lovefield) {
    'ngInject';
    super(Lovefield, 'project', PT_PROJECT_SERVICE_SCHEMA);
  }
}