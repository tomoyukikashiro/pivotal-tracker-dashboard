import {PtUserApiService} from './user.api.service';
import {PtStoryApiService} from './story.api.service';
import {PtProjectApiService} from './project.api.service';
import {PtIterationApiService} from './iteration.api.service';

import {PtUserDbService} from './user.db.service';
import {PtStoryDbService} from './story.db.service';
import {PtProjectDbService} from './project.db.service';
import {PtIterationDbService} from './iteration.db.service';

export default angular.module('pivotalTracker', [
  'ngResource'
])
  .service('ptUserApiService', PtUserApiService)
  .service('ptStoryApiService', PtStoryApiService)
  .service('ptProjectApiService', PtProjectApiService)
  .service('ptIterationApiService', PtIterationApiService)
  .service('ptUserDbService', PtUserDbService)
  .service('ptStoryDbService', PtStoryDbService)
  .service('ptProjectDbService', PtProjectDbService)
  .service('ptIterationDbService', PtIterationDbService);
