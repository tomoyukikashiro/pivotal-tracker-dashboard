import PtUserService from './user.service';

export default angular.module('pivotalTracker', [
  'ngResource'
])
  .service('ptUserService', PtUserService);
