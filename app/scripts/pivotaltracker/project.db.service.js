import DbBase from './db_base';
import {PT_PROJECT_SERVICE_SCHEMA} from './project.api.service';

export default class PtProjectDbService extends DbBase {
  constructor(moment, $q, Lovefield) {
    'ngInject';
    super(moment, $q, Lovefield, 'project', PT_PROJECT_SERVICE_SCHEMA);
  }

  getCurrentIterationNumber() {
    return this.select().then(results => {
      let [db, table] = results;
      return db.select().from(table).where(table.id.eq(1910553)).exec().then(result => {
        return result[0].current_iteration_number;
      });
    });
  }

  get(projectId) {
    return this.select().then(results => {
      let [db, table] = results;
      return db.select().from(table).where(table.id.eq(projectId)).exec().then(projects => {
        return projects[0];
      });
    });
  }

  getAll() {
    return this.select().then(results => {
      let [db, table] = results;
      return db.select().from(table).exec();
    });
  }
}
