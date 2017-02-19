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
    LovefieldProvider.create(appConstants.DB_NAME, appConstants.DB_VERSION);
  })
  .run((ptUserDbService, ptProjectDbService, ptStoryDbService, ptIterationDbService) => {
    'ngInject';
    ptUserDbService.createTable();
    ptProjectDbService.createTable();
    ptStoryDbService.createTable();
    ptIterationDbService.createTable();
  });
