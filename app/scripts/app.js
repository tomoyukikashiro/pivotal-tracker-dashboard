import constants from './constants';
import pivotalTracker from './pivotaltracker';
import localDb from './localdb';

angular
  .module('app', [
    'ngMaterial',
    'angularMoment',
    pivotalTracker.name,
    localDb.name
  ])
  .constant('appConstants', constants)
  .config((appConstants, LovefieldProvider) => {
    'ngInject';
    LovefieldProvider.create(appConstants.DB_NAME, appConstants.DB_VERSION);
  })
  .controller('testController', function(
    $scope, $q, ptUserApiService, ptUserDbService, ptProjectApiService, ptProjectDbService) {
    'ngInject';
    $scope.token = undefined;
    $scope.projects = undefined;
    $scope.targetProject = undefined;
    $scope.submitUser = function() {
      // call user api
      ptUserApiService.get($scope.token).then(user => {
        ptUserDbService.insertOrReplace(user)
          .then(() => {
            $scope.projects = user.projects;
          });
      }).catch(e => {
        console.log(e);
      });
    };
    $scope.submitProject = function() {
      ptProjectApiService.get($scope.token).then(project => {
        ptProjectDbService.insertOrReplace(project)
          .then(_project => {
            console.log(project);
            console.log(_project);
          });
      });
    };
  })
  .run((ptUserDbService, ptProjectDbService, ptStoryDbService, ptIterationDbService) => {
    'ngInject';
    ptUserDbService.createTable();
    ptProjectDbService.createTable();
    ptStoryDbService.createTable();
    ptIterationDbService.createTable();
  });
