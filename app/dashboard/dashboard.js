'use strict';

var dashboard = angular.module('myApp.dashboard', ['ngRoute']);

dashboard.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  });
}]);

dashboard.controller('DashboardCtrl', ["$scope", function($scope) {
    $scope.duplicated_stickers = [{"user": "1", "sticker": "2", "quantity":"4", "image": "sample.jpg"}, {"user": "1", "sticker": "2", "quantity": "2", "image": "sample.jpg"}];
    $scope.missing_stickers = [{"user": "1", "sticker": "2", "quantity":"3", "image": "sample.jpg"}];
    $scope.stats = [];
}]);

dashboard.directive("stickers", function() {
    return {
        restrict: 'E',
        templateUrl: "dashboard/partials/stickers.html",
        scope: {
            text: "=",
            stickers: "="
        }
    };
});

dashboard.directive("stats", function() {
    return {
        restrict: 'E',
        templateUrl: "dashboard/partials/stats.html",
        scope: {
            text: "=",
            stickers: "="
        }
    };
});
