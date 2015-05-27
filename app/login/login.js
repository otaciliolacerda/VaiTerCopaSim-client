/**
 * Created by otacilio on 5/27/15.
 */
'use strict';

var loginModule = angular.module('myApp.login', ['ngRoute', 'facebook']);

loginModule.config(['FacebookProvider', function(FacebookProvider) {
   FacebookProvider.init('768817646470532');
}]);

loginModule.controller('LoginCtrl', ['$location', '$rootScope', 'Facebook',
    function($location, $rootScope, Facebook) {

        // Defining user logged status
        $rootScope.isLoggedIn = false;
        $rootScope.user = {};

        /**
         * Watch for Facebook to be ready.
         */
        $rootScope.$watch(
            function() {
                return Facebook.isReady();
            },
            function(newVal) {
                if (newVal)
                    $rootScope.facebookReady = true;
            }
        );

        Facebook.getLoginStatus(function(response) {
            if(response.status === 'connected') {
                $rootScope.isLoggedIn = true;
                $rootScope.me();
                $location.path("/dashboard");
            } else {
                $rootScope.isLoggedIn = false;
                $location.path("/login");
            }
        });

        $rootScope.login = function() {
            if(!$rootScope.isLoggedIn) {
                Facebook.login(function (response) {
                    if (response.status == 'connected') {
                        $rootScope.isLoggedIn = true;
                        $rootScope.me();
                        console.log($rootScope.user);
                        console.log($rootScope.user);
                        $location.path("/dashboard");
                    }
                });
            }
        };

        $rootScope.me = function() {
            Facebook.api('/me', function(response) {
                /**
                 * Using $scope.$apply since this happens outside angular framework.
                 */
                $rootScope.$apply(function() {
                    $rootScope.user = response;
                });

            });
        };

        $rootScope.logout = function() {
            Facebook.logout(function() {
                $rootScope.$apply(function() {
                    $rootScope.user = {};
                    $rootScope.isLoggedIn = false;
                    $location.path("/login");
                });
            });
        }

}]);

