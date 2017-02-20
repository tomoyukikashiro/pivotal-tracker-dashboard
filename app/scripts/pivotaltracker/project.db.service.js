import DbBase from './db_base';
import {PT_PROJECT_SERVICE_SCHEMA} from './project.api.service';

export default class PtProjectDbService extends DbBase {
  constructor(moment, $q, Lovefield) {
    'ngInject';
    super(moment, $q, Lovefield, 'project', PT_PROJECT_SERVICE_SCHEMA);
  }

  // _modifyRowData(row) {
  //   row[this.schemas.START_DATE.NAME] = row[this.schemas.START_DATE.NAME] + 'T00:00:00Z';
  //   return row;
  // }
}
