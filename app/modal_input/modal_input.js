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
        if ($scope.input) {
            var param = parse_input();
            $http.post('http://0.0.0.0:8000/api/v1/sticker/1/duplicated/?stickers=' + param).success(function () {
                $scope.close();
            });
        } else {
            //TODO validate the textbox
            console.log("Invalid input!")
        };
    };

    $scope.add_needed_sticker = function () {
        if ($scope.input) {
            var param = parse_input();
            $http.post('http://0.0.0.0:8000/api/v1/sticker/1/needed/?stickers=' + param).success(function() {
                $scope.close();
            });
        } else {
            //TODO validate the textbox
            console.log("Invalid input!")
        };
    };

    $scope.close = function() {
        $modalInstance.dismiss('cancel');
        $scope.input = '';
    };
}]);