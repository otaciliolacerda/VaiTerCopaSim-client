'use strict';

// Declare app level module which depends on views, and components
var myAppModule = angular.module('myApp', [
  'ngRoute',
  'myApp.dashboard',
  'myApp.login',
  'myApp.user'
]);

myAppModule.constant('Constants', {'backend': 'YOUR_API_LINK'} );

myAppModule.factory('authInterceptor', ['$rootScope', '$q', '$localStorage', 'Constants',
    function ($rootScope, $q, $localStorage, Constants) {
    return {
        request: function (config) {
            //It will only intercept call to the API
            if (config.url.indexOf(Constants.backend) === 0) {
                config.headers = config.headers || {};
                if ($localStorage.client) {
                    config.headers.Authorization = 'Bearer ' + $localStorage.client.access_token;
                }
            }
            return config;
        },
        responseError: function (response) {
            if (response.status === 401 || response.status === 403) {
                // handle the case where the user is not authenticated
                $rootScope.logout();
            }
            //Bug http://stackoverflow.com/questions/15888162/angularjs-http-error-function-never-called
            //return response || $q.when(response);
            return $q.reject(response);
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
        }).when('/search', {
            templateUrl: 'user/search.html',
            controller: 'SearchCtrl'
        }).when('/compare/:id', {
            templateUrl: 'user/compare.html',
            controller: 'CompareCtrl'
        }).otherwise({redirectTo: '/dashboard'});
}]);


myAppModule.run(['$rootScope', '$location', '$localStorage', function($rootScope, $location, $localStorage) {

    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        //console.log($localStorage.client ? $localStorage.client.access_token : 'UNDEFINED');
        if (!$rootScope.isLoggedIn()) {
            // no logged user, redirect to /login
            if ( next.templateUrl === "login/login.html") {
            } else {
                $location.path("/login");
            }
        }
    });
}]);

myAppModule.directive("stickers", function() {
    return {
        restrict: 'E',
        templateUrl: "partials/stickers.html",
        scope: {
            text: "=",
            data: "=",
            loading: "=",
            error: "=",
            refreshFn: "&",
            deleteFn: "&",
            mutable: "="
        }
    };
});

myAppModule.directive("stats", function() {
    return {
        restrict: 'E',
        templateUrl: "partials/stats.html",
        scope: {
            data: "=",
            loading: "=",
            error: "=",
            refreshFn: "&"
        }
    };
});

myAppModule.directive("requestHandler", function() {
    return {
        restrict: 'E',
        templateUrl: "partials/request_handler.html",
        scope: {
            loading: "=",
            error: "=",
            refreshFn: "&"
        }
    };
});

