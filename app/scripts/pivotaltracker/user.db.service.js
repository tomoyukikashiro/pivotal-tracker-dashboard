import DbBase from './db_base';
import {PT_USER_SERVICE_SCHEMA} from './user.api.service';

export default class PtUserDbService extends DbBase {
  constructor(Lovefield) {
    'ngInject';
    super(Lovefield, 'user', PT_USER_SERVICE_SCHEMA);
  }
}
