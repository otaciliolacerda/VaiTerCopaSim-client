'use strict';

describe('myApp.dashboard module', function() {

  beforeEach(module('myApp.dashboard'));

  describe('testing dashboard controller', function(){

      var scope, dashboardCtrl, httpBackend, requestDuplicated, requestNeeded, requestStats;

      beforeEach(inject(function($controller, $rootScope, $httpBackend) {
          httpBackend = $httpBackend;
          scope = $rootScope.$new();

          requestDuplicated = httpBackend.whenGET('http://0.0.0.0:8000/api/v1/sticker/1/duplicated/').respond(200, duplicated);
          requestNeeded = httpBackend.whenGET('http://0.0.0.0:8000/api/v1/sticker/1/needed/').respond(200, needed);
          requestStats = httpBackend.whenGET('http://0.0.0.0:8000/api/v1/sticker/1/statistics/').respond(200, statistics);

          dashboardCtrl = $controller('DashboardCtrl', { $scope: scope });

          httpBackend.flush();
      }));

      afterEach(function() {
          //httpBackend.verifyNoOutstandingExpectation();
          //httpBackend.verifyNoOutstandingRequest();
      });

      it('should DashboardCtrl be defined', inject(function() {
          expect(dashboardCtrl).toBeDefined();
      }));

      var duplicated = [{"sticker": {"image": "1.jpg", "team": "Especiais", "number": "1", "name": "", "order": 1}, "user": 1, "quantity": 3}, {"sticker": {"image": "2.jpg", "team": "Especiais", "number": "2", "name": "", "order": 2}, "user": 1, "quantity": 1}];

      var needed = [{"sticker": {"image": "1.jpg", "team": "Especiais", "number": "1", "name": "", "order": 1}, "user": 1}, {"sticker": {"image": "2.jpg", "team": "Especiais", "number": "2", "name": "", "order": 2}, "user": 1}];

      var statistics = {"collected": 645, "teams": {"Camar\u00f5es": 0, "Holanda": 0, "It\u00e1lia": 0, "Costa Rica": 0, "Ir\u00e3": 0, "Costa do Marfim": 0, "Argentina": 0, "Espanha": 0, "Fran\u00e7a": 0, "Est\u00e1dios": 0, "Col\u00f4mbia": 0, "Chile": 0, "Especiais": 4, "Equador": 0, "B\u00e9lgica": 0, "Jap\u00e3o": 0, "Brasil": 0, "Sui\u00e7a": 0, "Inglaterra": 0, "Cro\u00e1cia": 0, "Estados Unidos": 0, "Alg\u00e9ria": 0, "Propaganda": 0, "Honduras": 0, "Portugal": 0, "Nig\u00e9ria": 0, "Gr\u00e9cia": 0, "Cor\u00e9ia": 0, "R\u00fassia": 0, "Gana": 0, "Alemanha": 0, "Uruguai": 0, "Austr\u00e1lia": 0, "B\u00f3snia Herzegovina": 0, "M\u00e9xico": 0}, "missing": 4};

      it('should refresh duplicated stickers', inject(function() {
          scope.duplicated_stickers = undefined;
          scope.refreshDuplicated();
          expect(scope.loadingDuplicated).toBeTruthy();
          expect(scope.errorDuplicated).toBeFalsy();
          httpBackend.flush();
          expect(scope.loadingDuplicated).toBeFalsy();
          expect(scope.errorDuplicated).toBeFalsy();
          expect(scope.duplicated_stickers).toEqual(duplicated);
      }));

      it('should refresh needed stickers', inject(function() {
          scope.needed_stickers = undefined;
          scope.refreshNeeded();
          expect(scope.loadingNeeded).toBeTruthy();
          expect(scope.errorNeeded).toBeFalsy();
          httpBackend.flush();
          expect(scope.loadingNeeded).toBeFalsy();
          expect(scope.errorNeeded).toBeFalsy();
          expect(scope.needed_stickers).toEqual(needed);
      }));

      it('should refresh statistics stickers', inject(function() {
          scope.statistics = undefined;
          scope.refreshStatistics();
          expect(scope.loadingStatistics).toBeTruthy();
          expect(scope.errorStatistics).toBeFalsy();
          httpBackend.flush();
          expect(scope.loadingStatistics).toBeFalsy();
          expect(scope.errorStatistics).toBeFalsy();
          expect(scope.statistics).toEqual(statistics);
      }));

      it('should show the error panel if any error occurs in duplicated stickers', inject(function() {
          requestDuplicated.respond(500, '');
          scope.refreshDuplicated();
          expect(scope.loadingDuplicated).toBeTruthy();
          expect(scope.errorDuplicated).toBeFalsy();
          httpBackend.flush();
          expect(scope.loadingDuplicated).toBeFalsy();
          expect(scope.errorDuplicated).toBeTruthy();
      }));

      it('should show the error panel if any error occurs in needed stickers', inject(function() {
          requestNeeded.respond(500, '');
          scope.refreshNeeded();
          expect(scope.loadingNeeded).toBeTruthy();
          expect(scope.errorNeeded).toBeFalsy();
          httpBackend.flush();
          expect(scope.loadingNeeded).toBeFalsy();
          expect(scope.errorNeeded).toBeTruthy();
      }));

      it('should show the error panel if any error occurs in statistics', inject(function() {
          requestStats.respond(500, '');
          scope.refreshStatistics();
          expect(scope.loadingStatistics).toBeTruthy();
          expect(scope.errorStatistics).toBeFalsy();
          httpBackend.flush();
          expect(scope.loadingStatistics).toBeFalsy();
          expect(scope.errorStatistics).toBeTruthy();
      }));

      it('should be able to delete duplicated stickers', inject(function() {
          spyOn(scope, 'refreshDuplicated');
          httpBackend.expectDELETE('http://0.0.0.0:8000/api/v1/sticker/1/duplicated/?sticker=2').respond(200, '');
          scope.deleteDuplicated(1, duplicated);
          expect(scope.loadingDuplicated).toBeTruthy();
          expect(scope.errorDuplicated).toBeFalsy();
          httpBackend.flush();
          expect(scope.refreshDuplicated).toHaveBeenCalled();
      }));

      it('should be able to delete needed stickers', inject(function() {
          spyOn(scope, 'refreshNeeded');
          httpBackend.expectDELETE('http://0.0.0.0:8000/api/v1/sticker/1/needed/?sticker=2').respond(200, '');
          scope.deleteNeeded(1, needed);
          expect(scope.loadingNeeded).toBeTruthy();
          expect(scope.errorNeeded).toBeFalsy();
          httpBackend.flush();
          expect(scope.refreshNeeded).toHaveBeenCalled();
      }));

  });
});