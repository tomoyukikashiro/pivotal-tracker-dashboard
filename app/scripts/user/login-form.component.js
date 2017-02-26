
export class loginFormCtrl {
  constructor(ptMeApiService, ptUserDbService) {
    'ngInject';
    this.apiToken = null;
    this.user = null;
    this.meApi = ptMeApiService;
    this.userDb = ptUserDbService;
  }
  submit(apiToken) {
    this.meApi.get(apiToken)
      .then(user => {
        return this.userDb.insertOrReplace(user);
      })
      .then(user => {
        this.user = user[0];
        this.onSuccess({user: this.user});
      });
  }
}

export let loginForm = {
  controller: loginFormCtrl,
  bindings: {
    onSuccess: '&'
  },
  templateUrl: 'templates/user/login-form.html'
};
