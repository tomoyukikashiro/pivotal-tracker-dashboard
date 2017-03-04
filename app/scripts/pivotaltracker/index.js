import {PtUserApiService} from './user.api.service';
import {PtMeApiService} from './me.api.service';
import {PtStoryApiService} from './story.api.service';
import {PtStoryTransitionApiService} from './story_transition.api.service';
import {PtProjectApiService} from './project.api.service';
import {PtIterationApiService} from './iteration.api.service';
import PtApisService from './apis.service';

import PtUserDbService from './user.db.service';
import PtStoryDbService from './story.db.service';
import PtStoryTransitionDbService from './story_transition.db.service';
import PtProjectDbService from './project.db.service';
import PtIterationDbService from './iteration.db.service';
import PtDbsService from './dbs.service';

export default angular.module('pivotalTracker', [
  'ngResource'
])
  .service('ptUserApiService', PtUserApiService)
  .service('ptMeApiService', PtMeApiService)
  .service('ptStoryApiService', PtStoryApiService)
  .service('ptStoryTransitionApiService', PtStoryTransitionApiService)
  .service('ptProjectApiService', PtProjectApiService)
  .service('ptIterationApiService', PtIterationApiService)
  .service('ptApisService', PtApisService)
  .service('ptUserDbService', PtUserDbService)
  .service('ptStoryDbService', PtStoryDbService)
  .service('ptStoryTransitionDbService', PtStoryTransitionDbService)
  .service('ptProjectDbService', PtProjectDbService)
  .service('ptIterationDbService', PtIterationDbService)
  .service('ptDbsService', PtDbsService);
