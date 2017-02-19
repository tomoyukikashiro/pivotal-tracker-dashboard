import DbBase from './db_base';
import {PT_STORY_SERVICE_SCHEMA} from './story.api.service';

export default class PtStoryDbService extends DbBase {
  constructor(LovefieldService) {
    'ngInject';
    super(LovefieldService.schemaBuilder, 'user', PT_STORY_SERVICE_SCHEMA);
  }
}
