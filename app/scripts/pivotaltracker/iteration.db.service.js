import DbBase from './db_base';
import {PT_ITERATION_SERVICE_SCHEMA} from './iteration.api.service';

export default class PtIterationDbService extends DbBase {
  constructor(moment, $q, Lovefield) {
    'ngInject';
    super(moment, $q, Lovefield, 'iteration', PT_ITERATION_SERVICE_SCHEMA);
  }

  getCurrent() {
    return this.select()
      .then(results => {
        let [db, table] = results;
        return db
          .select(table.num)
          .from(table)
          .orderBy(table.start, lf.Order.DESC)
          .limit(1)
          .exec()
          .then(results => {
            return results[0];
          });
      });
  }

  getStoryIdsInCurrent() {
    return this.getCurrent().then(iteration => {
      return iteration.story_ids;
    });
  }
}
