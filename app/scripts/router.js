
let cmnResolves = {
  me: function(ptUserDbService) {
    'ngInject';
    return ptUserDbService.getMe();
  }
};

export default function router($locationProvider, $routeProvider) {
  'ngInject';
  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/', {
      templateUrl: 'templates/home.html',
      controller: (me, $scope, $location) => {
        'ngInject';
        if (me) {
          goToDashboard();
        }
        $scope.$on('loginform.success', (e, projectId) => {
          goToDashboard(projectId);
        });
        $scope.$on('loginform.error', () => {
          // TODO loginform error handling
        });

        function goToDashboard(projectId) {
          $location.path('/dashboard').search('project', projectId);
        }
      },
      controllerAs: '$homeCtrl',
      resolve: cmnResolves
    })
    .when('/dashboard/', {
      templateUrl: 'templates/dashboard.html',
      controller: function(me, $location, iterationRecipeService) {
        'ngInject';
        if (!me) {
          $location.path('/');
        }
        // current iteration number
        iterationRecipeService.currentNum().then(number => {
          console.log(`current iteration number: ${number}`);
        });
        iterationRecipeService.currentRemainingDays().then(days => {
          console.log(`current remaining days: ${days}`);
        });
        iterationRecipeService.currentVelocity().then(velocity => {
          console.log(`current velocity: ${velocity}`);
        });
        iterationRecipeService.currentTeamStrength().then(strength => {
          console.log(`current team strength: ${strength}`);
        });
        iterationRecipeService.currentStoryCountGroupByType().then(types => {
          console.log(types);
        });
        iterationRecipeService.currentStoryCountGroupByStatus().then(statuses => {
          console.log(statuses);
        });
        iterationRecipeService.storyStateTransitions().then(transitions => {
          console.log(transitions);
        });
      },
      controllerAs: '$dashboardCtrl',
      resolve: cmnResolves
    })
    .otherwise({redirectTo: '/'});
}
