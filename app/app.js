'use strict';

// Declare app level module which depends on views, and components
var myAppModule = angular.module('myApp', [
  'ngRoute',
  'myApp.dashboard',
  'myApp.login'
]);

myAppModule.constant('Constants', {'backend': 'http://0.0.0.0:8000/api/v1/'} );

myAppModule.factory('authInterceptor', ['$rootScope', '$q', '$localStorage', function ($rootScope, $q, $localStorage) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($localStorage.token) {
                config.headers.Authorization = 'Bearer ' + $localStorage.token.access_token;
            }
            return config;
        },
        response: function (response) {
            if (response.status === 401 || response.status === 403) {
                // handle the case where the user is not authenticated
                $rootScope.logout();
            }
            return response || $q.when(response);
        }
    };
}]);

myAppModule.config(['$routeProvider', '$httpProvider',
    function($routeProvider, $httpProvider) {

        $httpProvider.interceptors.push('authInterceptor');

        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardCtrl'
        }).when('/login', {
            templateUrl: 'login/login.html',
            controller: 'LoginCtrl'
        }).otherwise({redirectTo: '/dashboard'});
}]);


myAppModule.run(['$rootScope', '$location', '$localStorage', function($rootScope, $location, $localStorage) {

    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        console.log($localStorage.token ? $localStorage.token.access_token : 'UNDEFINED');
        if (!$rootScope.isLoggedIn()) {
            // no logged user, redirect to /login
            if ( next.templateUrl === "login/login.html") {
            } else {
                $location.path("/login");
            }
        }
    });
}]);
