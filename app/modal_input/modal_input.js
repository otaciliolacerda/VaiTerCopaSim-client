var modal = angular.module('myApp.modalInput', ['ui.bootstrap']);

modal.controller('ModalCtrl', ['$scope', '$modal', '$log', function ($scope, $modal, $log) {

    $scope.open = function() {

        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'modal_input/modal_input.html',
            controller: 'ModalInstanceCtrl',
            size: 'lg'
        });
    };

}]);

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
modal.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', '$http',
    function ($scope, $modalInstance, $http) {

    var parse_input = function() {
        var input_val = $scope.input;
        var tokens = input_val.split(/[\s,\-]+|\(\d+\)/);
        return tokens.join(',');
    };

    $scope.add_duplicated_sticker = function () {
        var param = parse_input();
        $http.post('http://0.0.0.0:8000/api/v1/sticker/1/needed/?stickers=' + param);
    };

    $scope.add_missing_sticker = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.close = function() {
        $modalInstance.dismiss('cancel');
    };
}]);