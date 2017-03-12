export default function router($locationProvider, $routeProvider) {
  'ngInject';
  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/', {
      templateUrl: 'templates/home.html',
      controller: (me, project, $scope, $location) => {
        'ngInject';
        if (me) {
          goToDashboard(project.id);
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
      resolve: {
        me: ptUserDbService => {
          'ngInject';
          return ptUserDbService.getMe();
        },
        project: ptProjectDbService => {
          'ngInject';
          return ptProjectDbService.getAll().then(projects => {
            return projects[0];
          });
        }
      }
    })
    .when('/dashboard/', {
      templateUrl: 'templates/dashboard.html',
      controller: function(me, projects, project, $location) {
        'ngInject';
        if (!me) {
          $location.path('/');
        }
        this.project = project;
        this.projects = projects;
        this.searchParams = $location.search();

        this.isScopeIteration = this.searchParams.scope === 'iteration';
        this.isScopeTeam = this.searchParams.scope === 'team';
        this.isViewStats = this.searchParams.view === 'stats';
        this.isViewKanban = this.searchParams.view === 'kanban';
      },
      controllerAs: '$dashboardCtrl',
      resolve: {
        me: ptUserDbService => {
          'ngInject';
          return ptUserDbService.getMe();
        },
        projects: ptProjectDbService => {
          'ngInject';
          return ptProjectDbService.getAll();
        },
        project: ($location, ptProjectDbService) => {
          'ngInject';
          return ptProjectDbService.get($location.search().project);
        }
      }
    })
    .otherwise({redirectTo: '/'});
}
