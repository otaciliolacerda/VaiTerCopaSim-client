'use strict';

var dashboard = angular.module('myApp.dashboard', ['ngRoute', 'myApp.modalInput']);

dashboard.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  });
}]);

dashboard.controller('DashboardCtrl', ["$scope", '$http', function($scope, $http) {

    $scope.refresh = function() {
        $http.get('http://0.0.0.0:8000/api/v1/sticker/1/duplicated/').success(function(data){
            $scope.duplicated_stickers = data;
        });

        $http.get('http://0.0.0.0:8000/api/v1/sticker/1/needed/').success(function(data){
            $scope.needed_stickers = data;
        });

        $http.get('http://0.0.0.0:8000/api/v1/sticker/1/statistics/').success(function(data){
            $scope.stats = data;
        });
    };

    $scope.refresh();

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
            data: "="
        }
    };
});
