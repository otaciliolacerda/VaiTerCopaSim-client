'use strict';

var dashboard = angular.module('myApp.dashboard', ['ngRoute', 'myApp.modalInput']);

dashboard.controller('DashboardCtrl', ["$scope", '$http', function($scope, $http) {

    $scope.loadingDuplicated = true;
    $scope.loadingNeeded = true;
    $scope.loadingStatistics = true;

    $scope.errorDuplicated = false;
    $scope.errorNeeded = false;
    $scope.errorStatistics = false;

    $scope.deleteDuplicated = function(index, data) {
        var obj = data[index];

        $scope.loadingDuplicated = true;
        $scope.errorDuplicated = false;

        $http.delete('http://0.0.0.0:8000/api/v1/sticker/1/duplicated/?sticker=' + obj.sticker.number).success(function(data){
            $scope.refreshDuplicated();
        }).error(function() {
            $scope.loadingDuplicated = false;
            $scope.errorDuplicated = true;
        });
    };

    $scope.deleteNeeded = function(index, data) {
        var obj = data[index];

        $scope.loadingNeeded = true;
        $scope.errorNeeded = false;

        $http.delete('http://0.0.0.0:8000/api/v1/sticker/1/needed/?sticker=' + obj.sticker.number).success(function(data){
            $scope.refreshNeeded();
        }).error(function() {
            $scope.loadingNeeded = false;
            $scope.errorNeeded = true;
        });
    };

    $scope.refreshDuplicated = function() {

        $scope.loadingDuplicated = true;
        $scope.errorDuplicated = false;

        $http.get('http://0.0.0.0:8000/api/v1/sticker/1/duplicated/').success(function(data){
            $scope.duplicated_stickers = data;
            $scope.loadingDuplicated = false;
        }).error(function() {
            $scope.loadingDuplicated = false;
            $scope.errorDuplicated = true;
        });
    };

    $scope.refreshNeeded = function() {

        $scope.loadingNeeded = true;
        $scope.errorNeeded = false;

        $http.get('http://0.0.0.0:8000/api/v1/sticker/1/needed/').success(function(data){
            $scope.needed_stickers = data;
            $scope.loadingNeeded = false;
        }).error(function() {
            $scope.loadingNeeded = false;
            $scope.errorNeeded = true;
        });
    };

    $scope.refreshStatistics = function() {

        $scope.loadingStatistics = true;
        $scope.errorStatistics = false;

        $http.get('http://0.0.0.0:8000/api/v1/sticker/1/statistics/').success(function(data){
            $scope.statistics = data;
            $scope.loadingStatistics = false;
        }).error(function() {
            $scope.loadingStatistics = false;
            $scope.errorStatistics = true;
        });
    };

    var refreshData = function() {
        $scope.refreshDuplicated();
        $scope.refreshNeeded();
        $scope.refreshStatistics();
    };

    //on loading refresh all - need to consider this in unit testing.
    refreshData();

}]);

dashboard.directive("stickers", function() {
    return {
        restrict: 'E',
        templateUrl: "dashboard/partials/stickers.html",
        scope: {
            text: "=",
            data: "=",
            loading: "=",
            error: "=",
            refreshFn: "&",
            deleteFn: "&"
        }
   };
});

dashboard.directive("stats", function() {
    return {
        restrict: 'E',
        templateUrl: "dashboard/partials/stats.html",
        scope: {
            data: "=",
            loading: "=",
            error: "=",
            refreshFn: "&"
        }
    };
});
