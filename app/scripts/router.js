
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
      controller: function(me, $location, ptProjectApiService, ptProjectDbService,
        ptIterationApiService, ptIterationDbService, ptStoryApiService, ptStoryDbService,
        ptUserApiService, ptUserDbService, ptStoryTransitionApiService, ptStoryTransitionDbService) {
        'ngInject';
        if (me) {
          return $location.path('/dashboard');
        }
        this.onSuccessLogin = function(user) {
          this.user = user;
          ptProjectApiService.get(user.api_token)
            .then(projects => {
              ptProjectDbService.insertOrReplace(projects);
              // for now..
              ptIterationApiService.getAll(user.api_token, projects[0])
                .then(iterations => {
                  ptIterationDbService.insertOrReplace(iterations);
                });
              ptStoryApiService.getAll(user.api_token, projects[0])
                .then(stories => {
                  ptStoryDbService.insertOrReplace(stories);
                });
              ptStoryTransitionApiService.getAll(user.api_token, projects[0])
                .then(transitions => {
                  ptStoryTransitionDbService.insertOrReplace(transitions);
                });
              ptUserApiService.get(user.api_token, {projectId: projects[0].id})
                .then(users => {
                  let meIndex;
                  users.forEach((user, i) => {
                    if (this.user.id === user.id) {
                      meIndex = i;
                    }
                  });
                  if (meIndex) {
                    users.splice(meIndex, 1);
                  }
                  ptUserDbService.insertOrReplace(users);
                });
            });
        };
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
