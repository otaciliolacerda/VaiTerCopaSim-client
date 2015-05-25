'use strict';

describe('myApp.modalInput module', function() {

  beforeEach(module('myApp.modalInput'));

  describe('testing modal controller', function(){

    var fakeModal = {
      opened: true
    };

    var scope, modalCtrl, modalInstance;

    beforeEach(inject(function($controller, $rootScope, $modal) {
        spyOn($modal, 'open').andReturn(fakeModal);
        scope = $rootScope.$new();
        modalCtrl = $controller('ModalCtrl', { $scope: scope, $modal: $modal });
    }));


    it('should ModalCtrl be defined', inject(function() {
        expect(modalCtrl).toBeDefined();
    }));

    it('should open modal', inject(function() {
        scope.open();
        modalInstance = scope.modalInstance;
        expect(scope.modalInstance.opened).toBeTruthy();
    }));


    describe('testing modal instance controller', function() {

        var modalInstanceCtrl, $httpBackend, input, url, method;

        beforeEach(inject(function($controller, _$httpBackend_) {
            // Set up the mock http service responses
            $httpBackend = _$httpBackend_;
            scope.refresh = function(){};
            scope.open();
            modalInstance = scope.modalInstance;
            modalInstanceCtrl = $controller('ModalInstanceCtrl', { $scope: scope, $modalInstance: modalInstance });
            spyOn(scope, 'close');
            spyOn(scope, 'refresh');
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should parse comma separated input', function() {
            scope.input = '1-2-3-4-5-6';
            expect(scope.parse_input()).toBe('1,2,3,4,5,6');
        });

        it('should parse space separated input', function() {
            scope.input = '1,2,3,4,5,6';
            expect(scope.parse_input()).toBe('1,2,3,4,5,6');
        });

        it('should parse dash separated input', function() {
            scope.input = '1 2 3 4 5 6';
            expect(scope.parse_input()).toBe('1,2,3,4,5,6');
        });

        var test_add_stickers = function(input, url, method) {
            scope.input = input;
            $httpBackend.expectPOST(url, {}).respond(201, '');
            method();
            $httpBackend.flush();
            expect(scope.close).toHaveBeenCalled();
            expect(scope.refresh).toHaveBeenCalled();
        };

        it('should add and update needed stickers', function() {
            input = '1-2-3-4-5-6';
            url = 'http://0.0.0.0:8000/api/v1/sticker/1/duplicated/?stickers=1,2,3,4,5,6';
            method = scope.add_duplicated_sticker;
            test_add_stickers(input, url, method);
        });

        it('should add and update duplicated stickers', function() {
            input = '1-2-3-4-5-6';
            url = 'http://0.0.0.0:8000/api/v1/sticker/1/needed/?stickers=1,2,3,4,5,6';
            method = scope.add_needed_sticker;
            test_add_stickers(input, url, method);
        });

    });

  });

});