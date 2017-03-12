export class DashboardIterationStatsCtrl {
  constructor(iterationRecipeService) {
    'ngInject';
    this.metrics = {};
    this.iterationRecipeService = iterationRecipeService;
    // current iteration number
    this.iterationRecipeService.currentNum().then(number => {
      this.metrics.itertionNumber = number;
    });
    this.iterationRecipeService.currentRemainingDays().then(days => {
      this.metrics.remainingDays = days;
    });
    this.iterationRecipeService.currentVelocity().then(velocity => {
      this.metrics.velocity = velocity;
    });
    this.iterationRecipeService.currentTeamStrength().then(strength => {
      this.metrics.teamStrength = strength;
    });
    this.iterationRecipeService.currentStoryCountGroupByType().then(types => {
      let data = [];
      let labels = [];
      for (let type of types) {
        data.push(type['COUNT(id)']);
        labels.push(type.story_type);
      }
      this.metrics.storyTypes = {data, labels};
    });
    this.iterationRecipeService.currentStoryCountGroupByStatus().then(statuses => {
      let data = [];
      let labels = [];
      let acceptedCount = null;
      for (let status of statuses) {
        data.push(status['COUNT(id)']);
        labels.push(status.current_state);
        if (status.current_state === 'accepted') {
          acceptedCount = status['COUNT(id)'];
        }
      }
      this.metrics.storyStatus = {data, labels};
      this.metrics.acceptedRatio = firstDecimalPlace(acceptedCount / data.reduce((a, b) => a + b, 0)) * 100 + '%';
      function firstDecimalPlace(val) {
        return Math.floor(val * 10) / 10;
      }
    });
    this.iterationRecipeService.storyStateTransitions().then(transitions => {
      let stateData = {};
      transitions.forEach(dateData => {
        dateData.data.forEach(data => {
          stateData[data.state] = stateData[data.state] || [];
          stateData[data.state].push(data['COUNT(story_id)']);
        });
      });
      console.log(stateData);
      this.metrics.storyStateTransitions = {
        labels: transitions.map(item => item.date.format('dddd MMM DD')),
        series: Object.keys(stateData),
        data: Object.values(stateData)
      };
      console.log(this.metrics.storyStateTransitions);
    });
  }
}

export let dashboardIterationStats = {
  templateUrl: 'templates/views/dashboard-iteration-stats.html',
  controller: DashboardIterationStatsCtrl
};
