'use strict';

// Declare app level module which depends on views, and components
var myAppModule = angular.module('myApp', [
  'ngRoute',
  'myApp.dashboard',
  'myApp.login'
]);

myAppModule.config(['$routeProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/dashboard', {
        templateUrl: 'dashboard/dashboard.html',
        controller: 'DashboardCtrl'
    }).when('/login', {
        templateUrl: 'login/login.html',
        controller: 'LoginCtrl'
    }).otherwise({redirectTo: '/dashboard'});
}]);


myAppModule.run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        if ($rootScope.isLoggedIn == null || $rootScope.isLoggedIn == undefined) {
            // no logged user, redirect to /login
            if ( next.templateUrl === "login/login.html") {
            } else {
                $location.path("/login");
            }
        }
    });
}]);
