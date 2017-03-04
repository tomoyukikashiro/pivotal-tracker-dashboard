
export class loginFormCtrl {
  constructor($scope, $q, ptApisService, ptDbsService) {
    'ngInject';
    this.$scope = $scope;
    this.apiToken = null;
    this.user = null;
    this.projects = null;
    this.projectId = null;
    this.$q = $q;
    this.apis = ptApisService;
    this.dbs = ptDbsService;
    this.isLoading = false;
  }
  submitToken(apiToken) {
    this.isLoading = true;
    this.$q.all([
      this.apis.meApi.get(apiToken),
      this.apis.projectApi.get(apiToken)
    ]).then(results => {
      return this.$q.all([
        this.dbs.userDb.insertOrReplace(results[0]),
        this.dbs.projectDb.insertOrReplace(results[1])
      ]);
    }).then(results => {
      this.user = results[0][0];
      this.projects = results[1];
      this.isLoading = false;
    });
  }
  submitProject(apiToken, projectId) {
    this.isLoading = true;
    this.apis.getAllDataInProject(apiToken, projectId)
      .then(results => {
        results.users = this._excludeMe(results.users);
        return this.dbs.insertAllProjectData(results);
      })
      .then(() => {
        this.isLoading = false;
        this.$scope.$emit('loginform.success', this.projectId);
      }).catch(() => {
        this.isLoading = false;
        this.$scope.$emit('loginform.error');
      });
  }
  _excludeMe(users) {
    // If we insert user data which came from membership api
    // The current user's api token will be removed so we will exclude current user.
    return users.filter(user => {
      return user.id !== this.user.id;
    });
  }
}

export let loginForm = {
  controller: loginFormCtrl,
  controllerAs: 'loginFormCtrl',
  templateUrl: 'templates/user/login-form.html'
};
