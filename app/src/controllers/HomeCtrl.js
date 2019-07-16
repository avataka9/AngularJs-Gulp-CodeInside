angular.module('studentApp')
  .controller('HomeCtrl', [
    '$scope',
    function ($scope) {
      $scope.message = 'hello!';
    }
  ]);