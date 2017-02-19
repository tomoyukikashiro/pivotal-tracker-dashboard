import DbBase from './db_base';
import {PT_STORY_SERVICE_SCHEMA} from './story.api.service';

export default class PtStoryDbService extends DbBase {
  constructor(Lovefield) {
    'ngInject';
    super(Lovefield, 'story', PT_STORY_SERVICE_SCHEMA);
  }
}
