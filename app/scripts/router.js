
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
      controller: function(me, $location) {
        'ngInject';
        if (me) {
          $location.path('/dashboard');
        }
      },
      controllerAs: 'homeCtrl',
      resolve: cmnResolves
    })
    .when('/dashboard/', {
      templateUrl: 'templates/dashboard.html',
      controller: function(me, $location) {
        'ngInject';
        if (!me) {
          $location.path('/');
        }
      },
      controllerAs: 'dashboardCtrl',
      resolve: cmnResolves
    })
    .otherwise({redirectTo: '/'});
}
