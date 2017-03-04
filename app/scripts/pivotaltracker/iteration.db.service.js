import DbBase from './db_base';
import {PT_ITERATION_SERVICE_SCHEMA} from './iteration.api.service';

export default class PtIterationDbService extends DbBase {
  constructor(moment, $q, Lovefield) {
    'ngInject';
    super(moment, $q, Lovefield, 'iteration', PT_ITERATION_SERVICE_SCHEMA);
  }

  getIteration(iterationNumber) {
    return this.select().then(results => {
      let [db, table] = results;
      return db.select().from(table).where(table.number.eq(iterationNumber)).exec().then(iterations => {
        return iterations[0];
      });
    });
  }

  getStoryIdsInCurrent(iterationNumber) {
    return this.getIteration(iterationNumber).then(iteration => {
      return iteration.story_ids;
    });
  }
}
