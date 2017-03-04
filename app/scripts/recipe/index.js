import IterationRecipeService from './recipe.iteration.service';
import StoryRecipeService from './recipe.story.service';
import UserRecipeService from './recipe.user.service';
import ProjectRecipeService from './recipe.project.service';

export default angular.module('recipes', [])
  .service('iterationRecipeService', IterationRecipeService)
  .service('storyRecipeService', StoryRecipeService)
  .service('userRecipeService', UserRecipeService)
  .service('projectRecipeService', ProjectRecipeService);
