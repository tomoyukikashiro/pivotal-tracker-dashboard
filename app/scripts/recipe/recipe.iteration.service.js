
export default class IterationRecipeService {

  constructor(moment, $q, ptIterationDbService, ptStoryDbService, ptStoryTransitionDbService, ptProjectDbService) {
    'ngInject';
    this.iterationDbService = ptIterationDbService;
    this.storyDbService = ptStoryDbService;
    this.projectDbService = ptProjectDbService;
    this.storyTransitionDbService = ptStoryTransitionDbService;
    this.moment = moment;
    this.$q = $q;
  }

  current() {
    return this.projectDbService.getCurrentIterationNumber().then(iterationNumber => {
      return this.iterationDbService.getIteration(iterationNumber);
    });
  }

  currentNum() {
    return this.current()
      .then(iteration => {
        return iteration.number;
      });
  }

  currentRemainingDays() {
    return this.current()
      .then(iteration => {
        return this.moment(iteration.finish).diff(this.moment(iteration.start), 'days');
      });
  }

  currentVelocity() {
    return this.current()
      .then(iteration => {
        return iteration.velocity;
      });
  }

  currentTeamStrength() {
    return this.current()
      .then(iteration => {
        return iteration.team_strength;
      });
  }

  currentStoryCountGroupByType() {
    return this.current().then(iteration => {
      return this.iterationDbService.getStoryIdsInCurrent(iteration.number).then(storyIds => {
        return this.storyDbService.select().then(results => {
          let [db, table] = results;
          return db.select(table.story_type, lf.fn.count(table.id)).from(table).where(table.id.in(storyIds)).groupBy(table.story_type).exec();
        });
      });
    });
  }

  currentStoryCountGroupByStatus() {
    return this.current().then(iteration => {
      return this.iterationDbService.getStoryIdsInCurrent(iteration.number).then(storyIds => {
        return this.storyDbService.select().then(results => {
          let [db, table] = results;
          return db.select(table.current_state, lf.fn.count(table.id)).from(table).where(table.id.in(storyIds)).groupBy(table.current_state).exec();
        });
      });
    });
  }

  storyStateTransitions() {
    return this.current().then(iteration => {
      return this.storyTransitionDbService.select().then(results => {
        let [db, table] = results;
        let promises = [];
        let startDay = this.moment(iteration.start);
        let days = [];
        while (startDay.format('dddd') !== 'Sunday' && startDay.format('dddd') !== 'Saturday') {
          days.push(startDay.clone());
          promises.push(
            db.select(table.state, lf.fn.count(table.story_id))
              .from(table)
              .where(table.occurred_at.between(startDay.startOf('day').toDate(), startDay.endOf('day').toDate()))
              .groupBy(table.state).exec()
          );
          startDay = startDay.add(1, 'day');
        }
        return this.$q.all(promises).then(results => {
          let iterations = [];
          results.forEach((data, i) => {
            iterations.push({date: days[i], data: data});
          });
          return iterations;
        });
      });
    });
  }

}
