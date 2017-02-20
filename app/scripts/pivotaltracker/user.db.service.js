import DbBase from './db_base';
import {PT_USER_SERVICE_SCHEMA} from './user.api.service';

export default class PtUserDbService extends DbBase {
  constructor(moment, $q, Lovefield) {
    'ngInject';
    super(moment, $q, Lovefield, 'user', PT_USER_SERVICE_SCHEMA);
  }
}
