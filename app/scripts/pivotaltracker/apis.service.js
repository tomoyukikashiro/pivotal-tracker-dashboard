export default class PtApisService {
  constructor($q, ptMeApiService, ptUserApiService, ptProjectApiService,
        ptIterationApiService, ptStoryApiService, ptStoryTransitionApiService) {
    'ngInject';
    this.$q = $q;
    this.meApi = ptMeApiService;
    this.userApi = ptUserApiService;
    this.projectApi = ptProjectApiService;
    this.iterationApi = ptIterationApiService;
    this.storyApi = ptStoryApiService;
    this.storyTransitionApi = ptStoryTransitionApiService;
  }
  getAllDataInProject(token, projectId) {
    return this.$q.all([
      this.iterationApi.getAll(token, projectId),
      this.storyApi.getAll(token, projectId),
      this.storyTransitionApi.getAll(token, projectId),
      this.userApi.get(token, {projectId})
    ]).then(results => {
      let [iterations, stories, storyTransitions, users] = results;
      return {
        iterations, stories, storyTransitions, users
      };
    });
  }
}
