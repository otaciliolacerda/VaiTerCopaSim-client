/**
 * Created by otacilio on 5/27/15.
 */
'use strict';

var loginModule = angular.module('myApp.login', ['ngRoute', 'facebook', 'ngStorage']);

loginModule.run(['$location', '$rootScope', '$localStorage', function($location, $rootScope, $localStorage) {

    $rootScope.isLoggedIn = function() {
        return ($localStorage.token ? true : false);
    };

    //Revokes the token but do not logout of facebook (the user will only be logged out of the app)
    $rootScope.logout = function() {
        delete $localStorage.user;
        delete $localStorage.token;
        $location.path("/login");
    }

}]);

loginModule.config(['FacebookProvider', function(FacebookProvider) {
   FacebookProvider.init('768817646470532');
}]);


loginModule.controller('LoginCtrl', ['$location', '$rootScope', 'Facebook', '$http', 'Constants', '$localStorage',
    function($location, $rootScope, Facebook, $http, Constants, $localStorage) {

        $localStorage.user;
        $localStorage.token;


        $rootScope.isLoggedIn = function() {
            return ($localStorage.token ? true : false);
        };

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

        var myAppLogin = function(token) {
            $http({
                method: 'GET',
                url: Constants.backend + 'auth/login/',
                params: {access_token: token}
            }).
                success(function(data){
                    $rootScope.me();
                    console.log('MyApp Token: ', data.access_token);
                    $localStorage.token = data;
                    $location.path("/dashboard");
                });
        };

        $rootScope.login = function() {
            if(!$rootScope.isLoggedIn()) {

                Facebook.getLoginStatus(function(response) {

                    console.log('Facebook Status Response: ', response);
                    if(response.status === 'connected') {
                        myAppLogin(response.authResponse.accessToken);
                    } else {
                        Facebook.login(function (response) {
                            console.log('Facebook Login Response: ', response);
                            if (response.status == 'connected') {
                                myAppLogin(response.authResponse.accessToken);
                            }
                        });ß
                        $location.path("/login");
                    }

                });

            } else {
                console.log('You are logged in, do not need to call login.');
                $location.path("/dashboard");
            };
        };

        $rootScope.me = function() {
            Facebook.api('/me', function(response) {
                /**
                 * Using $scope.$apply since this happens outside angular framework.
                 */
                $rootScope.$apply(function() {
                    $localStorage.user = response;
                    console.log('me');
                    console.log(response);
                });

            });
        };

        //Revokes the token but do not logout of facebook (the user will only be logged out of the app)
        $rootScope.logout = function() {
            delete $localStorage.user;
            delete $localStorage.token;
            $location.path("/login");
        }

}]);

