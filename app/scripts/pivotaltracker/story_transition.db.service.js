import DbBase from './db_base';
import {PT_STORY_TRANSITION_SERVICE_SCHEMA} from './story_transition.api.service';

export default class PtStoryTransitionDbService extends DbBase {
  constructor(moment, $q, Lovefield) {
    'ngInject';
    super(moment, $q, Lovefield, 'story_transition', PT_STORY_TRANSITION_SERVICE_SCHEMA);
  }
}
