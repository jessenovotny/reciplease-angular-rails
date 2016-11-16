(function(){
  angular
  .module('reciPlease')
  .controller('CookbookController', function(Auth, $scope, $rootScope, Pagination, RecipeService){
    var ctrl = this

    ctrl.signedIn = Auth.isAuthenticated;

    Auth.currentUser().then(function(user) {
      ctrl.user = user
      $rootScope.cookbookRecipes = ctrl.user.cookbook.recipes
      ctrl.pagination = Pagination.getNew(10);
      ctrl.pagination.numPages = Math.ceil($rootScope.cookbookRecipes.length/ctrl.pagination.perPage);
    })

    ctrl.addToCookbook = function(recipe){
      recipe.bookmarked = true
      RecipeService.addToCookbook(ctrl.user.cookbook.id, recipe)
        .success(function(cookbook){  
          $rootScope.cookbookRecipes = cookbook.recipes
        })
    }

    ctrl.showCookbookRecipe = function(recipe){
      $rootScope.recipe = ctrl.alreadyInCookbook(recipe);
    }

    ctrl.removeFromCookbook = function(recipe){
      recipe.bookmarked = false
      var recipe = recipe
      RecipeService.removeFromCookbook(ctrl.user.cookbook.id, recipe)
        .success(function(cookbook){
          $rootScope.cookbookRecipes = cookbook.recipes;
        })
    }

    ctrl.alreadyInCookbook = function(recipe){
      var recipes = $rootScope.cookbookRecipes
      for(var i = 0; i < recipes.length; i++){
        if(recipes[i].label === recipe.label){
          recipe.bookmarked = true;
        }
      }
      return recipe
    }
  })
}())