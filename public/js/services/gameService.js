var app = angular.module("netPlay");

app.factory("gameService", ["$http", function($http) {
    var gameService = {
      state:{
        selectedCategory:"All Games",
        filteredGames:[],
        allGames: []
      },
      getGameData: function() {
          return $http.get("/api/gamedata").success(function(data) {

            gameService.state.allGames = data.map(function (game) {
              game.desktop_categories = game.desktop_categories.split(',');
              return game;
            });
            console.log("DATAAA",gameService.state.allGames);
            gameService.filterGames(gameService.state.selectedCategory);
          });
      },

      setCategory:function (category) {
        gameService.state.selectedCategory = category;
      },

      filterGames:function (category) {
        gameService.state.filteredGames = gameService.state.allGames.filter(function (game) {
          for(var i=0;i< game.desktop_categories.length;i++){
            if(category === game.desktop_categories[i] ){
              return true;
            }
          }
        });
      }


  };
    return gameService;
  }]);
