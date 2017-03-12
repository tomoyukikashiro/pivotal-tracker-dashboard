import router from './router';
import user from './user';
import constants from './constants';
import pivotalTracker from './pivotaltracker';
import localDb from './localdb';
import recipes from './recipe';
import dashboardViews from './views';

angular
  .module('app', [
    'ngRoute',
    'ngMaterial',
    'angularMoment',
    'chart.js',
    user.name,
    pivotalTracker.name,
    localDb.name,
    recipes.name,
    dashboardViews.name
  ])
  .constant('appConstants', constants)
  .config((appConstants, LovefieldProvider) => {
    'ngInject';
    LovefieldProvider.create(appConstants.DB_NAME, appConstants.DB_VERSION);
  })
  .config(router)
  .run((ptUserDbService, ptProjectDbService, ptStoryDbService, ptStoryTransitionDbService, ptIterationDbService) => {
    'ngInject';
    ptUserDbService.createTable();
    ptProjectDbService.createTable();
    ptStoryDbService.createTable();
    ptStoryTransitionDbService.createTable();
    ptIterationDbService.createTable();
  });
