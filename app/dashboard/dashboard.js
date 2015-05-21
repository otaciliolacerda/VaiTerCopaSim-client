'use strict';

var dashboard = angular.module('myApp.dashboard', ['ngRoute', 'myApp.modalInput']);

dashboard.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  });
}]);

dashboard.controller('DashboardCtrl', ["$scope", '$http', function($scope, $http) {

    $http.get('http://0.0.0.0:8000/api/v1/sticker/1/needed/').success(function(data){
        $scope.duplicated_stickers = data;
    });

    $scope.needed_stickers = [{"user": "1", "sticker": "2", "quantity":"3", "image": "J1.jpg"}];

    $scope.stats = [];
}]);

dashboard.directive("stickers", function() {
    return {
        restrict: 'E',
        templateUrl: "dashboard/partials/stickers.html",
        scope: {
            text: "=",
            data: "="
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
