/**
 * Created by otacilio on 5/31/15.
 */
'use strict';

describe('myApp.user module', function() {

    beforeEach(module('myApp.user'));

    describe('testing search controller', function() {

        var scope, constants, httpBackend, searchCtrl, request;

        var data = [
            {
                'uid': '1',
                'id': 1,
                'name': 'test',
                'duplicated_count': 3
            },
            {
                'uid': '2',
                'id': 2,
                'name': 'test2',
                'duplicated_count': 4
            }
        ];

        beforeEach(inject(function($controller, $rootScope, $httpBackend) {
            scope = $rootScope.$new();
            httpBackend = $httpBackend;
            constants = {'backend': 'http://0.0.0.0:8000/api/v1/'};

            request = httpBackend.whenGET(constants.backend + 'search/').respond(200, data);

            searchCtrl = $controller('SearchCtrl', {
                $scope: scope,
                Constants: constants
            });

            httpBackend.flush();
        }));

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('should LoginCtrl be defined', inject(function() {
            expect(searchCtrl).toBeDefined();
        }));

        it('should fetch data from refresh', inject(function() {
            scope.data = undefined;
            scope.refreshSearch();
            expect(scope.loading).toBeTruthy();
            expect(scope.error).toBeFalsy();
            httpBackend.flush();
            expect(scope.loading).toBeFalsy();
            expect(scope.error).toBeFalsy();
            expect(scope.data).toEqual(data);
        }));

        it('should show the error panel if any error occurs in data fetch', inject(function() {
            request.respond(500, '');
            scope.refreshSearch();
            expect(scope.loading).toBeTruthy();
            expect(scope.error).toBeFalsy();
            httpBackend.flush();
            expect(scope.loading).toBeFalsy();
            expect(scope.error).toBeTruthy();
        }));

    });

    describe('testing compare controller', function() {

        var scope, constants, httpBackend, routeParams, compareCtrl, request;

        var data = [
            {
                'other_user': {
                    'id': 1,
                    'uid': '1',
                    'name': 'test test'
                },
                'my_interest': {"image": "1.jpg", "team": "Especiais", "number": "1", "name": "", "order": 1},
                'other_interest': {"image": "2.jpg", "team": "Especiais", "number": "2", "name": "", "order": 2},
                'other_duplicated': {"image": "1.jpg", "team": "Especiais", "number": "1", "name": "", "order": 1, "quantity": 3},
                'other_needed': {"image": "2.jpg", "team": "Especiais", "number": "2", "name": "", "order": 2},
                'other_stats': {"collected": 645, "teams": {"Camar\u00f5es": 0, "Holanda": 0, "It\u00e1lia": 0, "Costa Rica": 0, "Ir\u00e3": 0, "Costa do Marfim": 0, "Argentina": 0, "Espanha": 0, "Fran\u00e7a": 0, "Est\u00e1dios": 0, "Col\u00f4mbia": 0, "Chile": 0, "Especiais": 4, "Equador": 0, "B\u00e9lgica": 0, "Jap\u00e3o": 0, "Brasil": 0, "Sui\u00e7a": 0, "Inglaterra": 0, "Cro\u00e1cia": 0, "Estados Unidos": 0, "Alg\u00e9ria": 0, "Propaganda": 0, "Honduras": 0, "Portugal": 0, "Nig\u00e9ria": 0, "Gr\u00e9cia": 0, "Cor\u00e9ia": 0, "R\u00fassia": 0, "Gana": 0, "Alemanha": 0, "Uruguai": 0, "Austr\u00e1lia": 0, "B\u00f3snia Herzegovina": 0, "M\u00e9xico": 0}, "missing": 4}
            }
        ];

        beforeEach(inject(function($controller, $rootScope, $httpBackend, $routeParams) {
            scope = $rootScope.$new();
            httpBackend = $httpBackend;
            constants = {'backend': 'http://0.0.0.0:8000/api/v1/'};
            routeParams = $routeParams;

            routeParams.id = 1

            request = httpBackend.whenGET(constants.backend + 'compare/?user_id=1').respond(200, data);

            compareCtrl = $controller('CompareCtrl', {
                $scope: scope,
                Constants: constants,
                $routeParams: routeParams
            });

            httpBackend.flush();
        }));

        it('should LoginCtrl be defined', inject(function() {
            expect(compareCtrl).toBeDefined();
        }));

        it('should fetch data from refresh', inject(function() {
            scope.data = undefined;
            scope.refreshCompare();
            expect(scope.loading).toBeTruthy();
            expect(scope.error).toBeFalsy();
            httpBackend.flush();
            expect(scope.loading).toBeFalsy();
            expect(scope.error).toBeFalsy();
            expect(scope.data).toEqual(data);
        }));

        it('should show the error panel if any error occurs in data fetch', inject(function() {
            request.respond(500, '');
            scope.refreshCompare();
            expect(scope.loading).toBeTruthy();
            expect(scope.error).toBeFalsy();
            httpBackend.flush();
            expect(scope.loading).toBeFalsy();
            expect(scope.error).toBeTruthy();
        }));

    });

});
