/**
 * Created by otacilio on 5/30/15.
 */
//'use strict';

describe('myApp.login module', function() {

    beforeEach(module('myApp.login'));

    var facebook, facebookProvider, fb;

    beforeEach(function () {
        // Load the service's module
        module('facebook', function (_FacebookProvider_) {
            facebookProvider = _FacebookProvider_;
        });

        inject(function (_Facebook_) {
            facebook = _Facebook_;
        });
    });

    describe('testing login controller', function() {

        var scope, loginCtrl, constants, httpBackend, localStorage, fb, rootScope;

        function FacebookMockModule() {
            this.getLoginStatus_status = this.getLoginStatus_token = null;
            this.login_status = this.login_token = null;

            this.getLoginStatus = function(fn) {
                fn({status: this.getLoginStatus_status, authResponse: {accessToken: this.getLoginStatus_token}});
            };

            this.login = function(fn) {
                fn({status: this.login_status, authResponse: {accessToken: this.login_token}});
            };

            this.api = function(path, fn) {
                //fn({username: 'test_user'});
            };

            this.isReady = function() {
                return true;
            };

            //Those are responses from the FB service
            this.setGetLoginStatusParams = function(isConnected, isValidToken) {
                this.getLoginStatus_status = isConnected ? 'connected': 'unknown';
                this.getLoginStatus_token = isValidToken ? 'VALID_FB_TOKEN': 'INVALID_FB_TOKEN';
            };

            this.setLoginParams = function(isConnected, isValidToken) {
                this.login_status = isConnected ? 'connected': 'unknown';
                this.login_token = isValidToken ? 'VALID_FB_TOKEN': 'INVALID_FB_TOKEN';
            };
        };

        beforeEach(inject(function($rootScope, $controller, $httpBackend, $location) {

            fb = new FacebookMockModule();
            //console.log(Object.getOwnPropertyNames(fb).filter(function (p) {return typeof fb[p] === 'function';}));
            //console.log(fb.getLoginStatus(function(r){ console.log(r.status)}))

            rootScope = $rootScope.$new();
            scope = $rootScope.$new();
            localStorage = $rootScope.$new();
            httpBackend = $httpBackend;
            constants = {'backend': 'http://0.0.0.0:8000/api/v1/'};

            loginCtrl = $controller('LoginCtrl', {
                $location: $location,
                $rootScope: rootScope,
                $scope: scope,
                Facebook: fb,
                Constants: constants,
                $localStorage: localStorage

            });

            //Since the isLoggedIn function is inside a run block it will be mock
            rootScope.isLoggedIn = function() {
                return (localStorage.token ? true : false);
            };

        }));

        it('should LoginCtrl be defined', inject(function() {
            expect(loginCtrl).toBeDefined();
        }));

        //We have X scenarios:
        //1- App token is not available and Facebook status is 'unknown' so the user needs to get both,
        //   FB token and the App token
        //2- App token is not available but Facebook status is 'connected' so the user only needs to get the App token
        //3- The App token is in the local storage so no need for login
        describe('test CASE 1', function(){
            beforeEach(inject(function() {
                fb.setGetLoginStatusParams(false, false);
                localStorage.token = undefined;
            }))

            it('should get valid facebook token and request app token', inject(function() {
                fb.setLoginParams(true, true);

                var myAppToken = 'myApp_TOKEN';
                httpBackend.whenGET(constants.backend + 'auth/login/?access_token=VALID_FB_TOKEN')
                    .respond(200, {access_token: myAppToken});
                expect(localStorage.token).toBeUndefined();
                scope.login();
                httpBackend.flush();
                expect(localStorage.token.access_token).toEqual(myAppToken);
                expect(scope.showAlert).toBeFalsy();
            }));

            it('should refuse invalid facebook token when request app token', inject(function() {
                fb.setLoginParams(true, false);

                httpBackend.whenGET(constants.backend + 'auth/login/?access_token=INVALID_FB_TOKEN')
                    .respond(403, {access_token: ''});
                expect(localStorage.token).toBeUndefined();
                scope.login();
                httpBackend.flush();
                expect(localStorage.token).toBeUndefined();
                expect(scope.showAlert).toBeTruthy();
            }));

            it('should show alert if facebook authentication fails', inject(function() {
                fb.setLoginParams(false, false)

                expect(localStorage.token).toBeUndefined();
                scope.login();
                expect(localStorage.token).toBeUndefined();
                expect(scope.showAlert).toBeTruthy();
            }));
        });

        describe('test CASE 2', function(){
            beforeEach(inject(function() {
                localStorage.token = undefined
                fb.setGetLoginStatusParams(true, true);
            }));

            it('should get valid app token', inject(function() {
                var myAppToken = 'myApp_TOKEN';
                httpBackend.whenGET(constants.backend + 'auth/login/?access_token=VALID_FB_TOKEN')
                    .respond(200, {access_token: myAppToken});
                expect(localStorage.token).toBeUndefined();
                scope.login();
                httpBackend.flush();
                expect(localStorage.token.access_token).toEqual(myAppToken);
                expect(scope.showAlert).toBeFalsy();
            }));

            it('should refuse invalid facebook token when requesting app token', inject(function() {
                fb.setGetLoginStatusParams(true, false);
                httpBackend.whenGET(constants.backend + 'auth/login/?access_token=INVALID_FB_TOKEN')
                    .respond(403);
                expect(localStorage.token).toBeUndefined();
                scope.login();
                httpBackend.flush();
                expect(scope.showAlert).toBeTruthy();
            }));
        });

        describe('test CASE 3', function(){
            it('should ', inject(function() {
                localStorage.token = 'VALID_TOKEN';
                scope.login();
                expect(scope.showAlert).toBeFalsy();
            }));
        });

    });

});
