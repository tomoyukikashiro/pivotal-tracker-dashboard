
export default class IterationRecipeService {

  constructor(moment, ptIterationDbService, ptStoryDbService) {
    'ngInject';
    this.iterationDbService = ptIterationDbService;
    this.storyDbService = ptStoryDbService;
    this.moment = moment;
  }

  currentNum() {
    return this.iterationDbService.getCurrent()
      .then(iteration => {
        return iteration.number;
      });
  }

  currentRemainingDays() {
    return this.iterationDbService.getCurrent()
      .then(iteration => {
        return this.moment(iteration.finish).diff(this.moment(iteration.start), 'days');
      });
  }

  currentVelocity() {
    return this.iterationDbService.getCurrent()
      .then(iteration => {
        return iteration.velocity;
      });
  }

  currentTeamStrength() {
    return this.iterationDbService.getCurrent()
      .then(iteration => {
        return iteration.team_strength;
      });
  }

  currentStoryCountGroupByType() {
    return this.iterationDbService.getStoryIdsInCurrent().then(storyIds => {
      return this.storyDbService.select().then(results => {
        let [db, table] = results;
        return db.select(table.story_type, lf.fn.count(table.id)).from(table).where(table.id.in(storyIds)).groupBy(table.story_type).exec();
      });
    });
  }

  currentStoryCountGroupByStatus() {
    return this.iterationDbService.getStoryIdsInCurrent().then(storyIds => {
      return this.storyDbService.select().then(results => {
        let [db, table] = results;
        return db.select(table.current_state, lf.fn.count(table.id)).from(table).where(table.id.in(storyIds)).groupBy(table.story_type).exec();
      });
    });
  }

}
