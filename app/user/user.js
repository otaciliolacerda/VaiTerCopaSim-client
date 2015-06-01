/**
 * Created by otacilio on 5/30/15.
 */
'use strict';

var userModule = angular.module('myApp.user', ['ngRoute']);

userModule.controller('SearchCtrl', ["$scope", '$http', 'Constants', function($scope, $http, Constants) {
    $scope.loading = true;
    $scope.error = false;

    //Needs: UID, ID, NAME, DUPLICATED_STICKERS_COUNT
    $scope.refreshSearch = function() {
        $scope.loading = true;
        $scope.error = false;

        $http({
            method: 'GET',
            url: Constants.backend + 'search/'
        }).success(function(data){
            $scope.loading = false;
            $scope.data= data;
        }).error(function() {
            $scope.loading = false;
            $scope.error = true;
        });
    };

    $scope.refreshSearch();
}]);

userModule.controller('CompareCtrl', ['$scope', '$http', 'Constants', '$routeParams',
    function($scope, $http, Constants, $routeParams) {
        $scope.loading = true;
        $scope.error = false;

        $scope.refreshCompare = function() {
            $scope.loading = true;
            $scope.error = false;

            $http({
                method: 'GET',
                url: Constants.backend + 'compare/',
                params: { user_id: $routeParams.id }
            }).success(function(data){
                $scope.loading = false;
                $scope.data= data;
            }).error(function() {
                $scope.loading = false;
                $scope.error = true;
            });
        };

        $scope.refreshCompare();
}]);