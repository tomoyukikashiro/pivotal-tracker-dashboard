import {PtUserApiService} from './user.api.service';
import {PtStoryApiService} from './story.api.service';
import {PtProjectApiService} from './project.api.service';
import {PtIterationApiService} from './iteration.api.service';

export default angular.module('pivotalTracker', [
  'ngResource'
])
  .service('ptUserApiService', PtUserApiService)
  .service('ptStoryApiService', PtStoryApiService)
  .service('ptProjectApiService', PtProjectApiService)
  .service('ptIterationApiService', PtIterationApiService);
