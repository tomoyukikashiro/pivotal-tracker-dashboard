import constants from './constants';
import pivotalTracker from './pivotaltracker';
import localDb from './localdb';

angular
  .module('app', [
    pivotalTracker.name,
    localDb.name
  ])
  .constant('appConstants', constants)
  .config((appConstants, LovefieldProvider) => {
    'ngInject';
    let schemaBuilder = LovefieldProvider.create(appConstants.DB_NAME, appConstants.DB_VERSION);
    schemaBuilder.createTable('first')
      .addColumn('id', LovefieldProvider.Types.INTEGER)
      .addColumn('name', LovefieldProvider.Types.STRING)
      .addPrimaryKey(['id']);

    schemaBuilder.connect().then(() => {
      // let table = db.getSchema().table('first');
      // let row = table.createRow({
      //   id: 1,
      //   name: 'blabla'
      // });

      // return db.insert.into(table).values([row]).exec();
    });
  });
