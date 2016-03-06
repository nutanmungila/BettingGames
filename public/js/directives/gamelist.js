var app = angular.module("netPlay");

app.directive("gameList", function() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: "templates/game.html",
      controller: 'gameController'
    };
});

app.controller('gameController',[
  "$scope",
  "gameService",
  function($scope,gameService) {
    $scope.gameCategoryList = ["FEATURED","SLOTS","ROULETTE","BLACLJACK","JACKPOTS","LIVE"];
    $scope.gameCategoryListValue = ["Popular Games","Slots","Roulette","Blackjack","Jackpots","All Games"];

    gameService.getGameData();

    $scope.state = gameService.state;

    $scope.$watch('state.selectedCategory', function(newValue, oldValue) {
      gameService.filterGames(newValue);
    });

    $scope.onClickCategory = function(category) {
        gameService.setCategory(category);
    }
  }
]);
