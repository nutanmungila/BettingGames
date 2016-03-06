describe('gameService : ', function () {
    beforeEach(module('netPlay'));


    describe('when instatiated', function () {
        var gameService;

        beforeEach(inject(function (_gameService_) {
            gameService = _gameService_;
        }));

        it('should have All Games as selectedCategory', function () {
            expect(gameService.state.selectedCategory).toBe('All Games');
        });

        it('filtered games should be empty', function () {
          expect(gameService.state.filteredGames.length).toBe(0);
        })
    });

    describe('when setCategory', function () {
        var gameService;

        beforeEach(inject(function (_gameService_) {
            gameService = _gameService_;
        }));

        it('should set category', function () {
            gameService.setCategory("Slots");
            expect(gameService.state.selectedCategory).toBe('Slots');
        });


    });

    describe('when getGameData', function () {
        var gameService,httpBackend,authRequestHandler;

        beforeEach(inject(function (_gameService_,$injector) {

            gameService = _gameService_;
            httpBackend = $injector.get('$httpBackend');

            authRequestHandler = httpBackend.when('GET', '/api/gamedata')
                            .respond([{
                              "title": "Frankie Dettori",
                              "image_180x100": "//d37q0bzpeg751b.cloudfront.net/assets/GB/games/sc_fdt_180x100.jpg",
                              "desktop_categories_ids": "39,3,79",
                              "desktop_categories": [
                                "Popular Games",
                                "Slots",
                                "All Games"
                              ]
                            },{
                              "title": "Wild Games",
                              "image_180x100": "//d37q0bzpeg751b.cloudfront.net/assets/GB/games/SC_WILDGAMES_180x100.jpg",
                              "desktop_categories_ids": "3,79",
                              "desktop_categories": [
                                "Slots",
                                "All Games"
                              ]
                            }]);

        }));

        it('should getGameData', function () {
            httpBackend.expectGET('/api/gamedata');
            gameService.getGameData();
        });


    });

    describe('when filterGames', function () {
        var gameService;

        beforeEach(inject(function (_gameService_) {
            gameService = _gameService_;
            gameService.state.allGames = [{
              "title": "Frankie Dettori",
              "image_180x100": "//d37q0bzpeg751b.cloudfront.net/assets/GB/games/sc_fdt_180x100.jpg",
              "desktop_categories_ids": "39,3,79",
              "desktop_categories": [
                "Popular Games",
                "Slots",
                "All Games"
              ]
            },{
              "title": "Wild Games",
              "image_180x100": "//d37q0bzpeg751b.cloudfront.net/assets/GB/games/SC_WILDGAMES_180x100.jpg",
              "desktop_categories_ids": "3,79",
              "desktop_categories": [
                "Slots",
                "All Games"
              ]
            },{
              "title": "Desert Treasure II",
              "image_180x100": "//d37q0bzpeg751b.cloudfront.net/assets/GB/games/sc-dt2-180x100.jpg",
              "desktop_categories_ids": "3,79",
              "desktop_categories": [
                "Slots",
                "All Games"
              ]
            }];
        }));

    it('should filterGames', function () {

      gameService.filterGames("Popular Games");
      expect(gameService.state.filteredGames).toEqual([{
              "title": "Frankie Dettori",
              "image_180x100": "//d37q0bzpeg751b.cloudfront.net/assets/GB/games/sc_fdt_180x100.jpg",
              "desktop_categories_ids": "39,3,79",
              "desktop_categories": [
                "Popular Games",
                "Slots",
                "All Games"
              ]
            }]);
    });

});

});
