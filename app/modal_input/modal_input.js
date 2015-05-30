var modal = angular.module('myApp.modalInput', ['ui.bootstrap']);

modal.controller('ModalCtrl', ['$scope', '$modal', function ($scope, $modal) {

    $scope.open = function() {

        $scope.modalInstance = $modal.open({
            animation: true,
            templateUrl: 'modal_input/modal_input.html',
            controller: 'ModalInstanceCtrl',
            size: 'lg',
            scope: $scope
        });
    };

}]);

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
modal.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', '$http', 'Constants',
    function ($scope, $modalInstance, $http, Constants) {

    var showAlert = function(message) {
        $scope.showAlert = true;
        $scope.textAlert = 'Invalid input. Ex.: 1, 2, 3, 31, 4, L1. Make sure you enter an valid sticker.';
    };

    $scope.showAlert = false;

    $scope.parse_input = function() {
        var input_val = $scope.input;
        var tokens = input_val.split(/[\s,\-]+|\(\d+\)/);
        return tokens.join(',');
    };

    $scope.add_duplicated_sticker = function () {
        if ($scope.input) {
            var param = $scope.parse_input();
            $http({
                method: 'PUT',
                url: Constants.backend + 'sticker/duplicated/',
                data: {stickers: param}
            }).success(function () {
                $scope.close();
                $scope.refreshDuplicated();
            }).error(function(data, status) {
                showAlert();
                console.log('Error in ModalInstanceCtrl.add_duplicated_sticker. Status: ', status);
            });
        } else {
            showAlert();
        };
    };

    $scope.add_needed_sticker = function () {
        if ($scope.input) {
            var param = $scope.parse_input();
            $http({
                method: 'PUT',
                url: Constants.backend + 'sticker/needed/',
                data: {stickers: param}
            }).success(function() {
                $scope.close();
                $scope.refreshNeeded();
            }).error(function(data, status) {
                showAlert();
                console.log('Error in ModalInstanceCtrl.add_needed_sticker. Status: ', status, ' Body: ', data);
            });
        } else {
            showAlert();
        };
    };

    $scope.close = function() {
        $modalInstance.dismiss('cancel');
        $scope.input = '';
        $scope.closeAlert();
    };

    $scope.closeAlert = function() {
        $scope.showAlert = false;
    };

}]);