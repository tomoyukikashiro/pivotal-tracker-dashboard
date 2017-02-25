import DbBase from './db_base';
import {PT_USER_SERVICE_SCHEMA} from './user.api.service';

export default class PtUserDbService extends DbBase {
  constructor(moment, $q, Lovefield) {
    'ngInject';
    super(moment, $q, Lovefield, 'user', PT_USER_SERVICE_SCHEMA);
  }
  getMe() {
    return this.select()
      .then(promises => {
        let db = promises[0];
        let table = promises[1];
        return db.select().from(table).where(table.api_token.isNotNull()).exec()
          .then(results => {
            return results[0];
          });
      });
  }
}
