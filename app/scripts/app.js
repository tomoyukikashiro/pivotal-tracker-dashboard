import router from './router';
import user from './user';
import constants from './constants';
import pivotalTracker from './pivotaltracker';
import localDb from './localdb';
import recipes from './recipe';

angular
  .module('app', [
    'ngRoute',
    'ngMaterial',
    'angularMoment',
    user.name,
    pivotalTracker.name,
    localDb.name,
    recipes.name
  ])
  .constant('appConstants', constants)
  .config((appConstants, LovefieldProvider) => {
    'ngInject';
    LovefieldProvider.create(appConstants.DB_NAME, appConstants.DB_VERSION);
  })
  .config(router)
  // .controller('testController', function(
  //   $scope, $q, ptUserApiService, ptUserDbService, ptProjectApiService, ptProjectDbService, ptIterationApiService, ptIterationDbService, ptStoryApiService, ptStoryDbService, ptMeApiService) {
  //   'ngInject';
  //   $scope.token = undefined;
  //   $scope.projects = undefined;
  //   $scope.target = null;
  //   $scope.submitUser = function() {
  //     // call user api
  //     ptMeApiService.get($scope.token).then(user => {
  //       ptUserDbService.insertOrReplace(user)
  //         .then(() => {
  //           $scope.projects = user.projects;
  //           $scope.user = user;
  //         });
  //     }).catch(e => {
  //       console.log(e);
  //     });
  //   };
  //   $scope.submitProject = function() {
  //     ptProjectApiService.get($scope.token, {projectId: $scope.targetProject}).then(projects => {
  //       ptProjectDbService.insertOrReplace(projects)
  //         .then(() => {
  //           ptIterationApiService.getAll($scope.token, projects[0])
  //             .then(iterations => {
  //               ptIterationDbService.insertOrReplace(iterations);
  //             });
  //           ptStoryApiService.getAll($scope.token, projects[0])
  //             .then(stories => {
  //               ptStoryDbService.insertOrReplace(stories);
  //             });
  //           ptUserApiService.get($scope.token, {projectId: projects[0].id})
  //             .then(users => {
  //               let meIndex;
  //               users.forEach((user, i) => {
  //                 if ($scope.user.id === user.id) {
  //                   meIndex = i;
  //                 }
  //               });
  //               if (meIndex) {
  //                 users.splice(meIndex, 1);
  //               }
  //               ptUserDbService.insertOrReplace(users);
  //             });
  //         });
  //     });
  //   };
  // })
  .run((ptUserDbService, ptProjectDbService, ptStoryDbService, ptIterationDbService) => {
    'ngInject';
    ptUserDbService.createTable();
    ptProjectDbService.createTable();
    ptStoryDbService.createTable();
    ptIterationDbService.createTable();
  });
