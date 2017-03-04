export default class PtDbsService {
  constructor($q, ptUserDbService, ptProjectDbService,
        ptIterationDbService, ptStoryDbService, ptStoryTransitionDbService) {
    'ngInject';
    this.$q = $q;
    this.userDb = ptUserDbService;
    this.projectDb = ptProjectDbService;
    this.iterationDb = ptIterationDbService;
    this.storyDb = ptStoryDbService;
    this.storyTransitionDb = ptStoryTransitionDbService;
  }
  insertAllProjectData(dataList) {
    return this.$q.all([
      this.iterationDb.insertOrReplace(dataList.iterations),
      this.storyDb.insertOrReplace(dataList.stories),
      this.storyTransitionDb.insertOrReplace(dataList.storyTransitions),
      this.userDb.insertOrReplace(dataList.users)
    ]).then(results => {
      let [iterations, stories, storyTransitions, users] = results;
      return {
        iterations, stories, storyTransitions, users
      };
    });
  }
}
