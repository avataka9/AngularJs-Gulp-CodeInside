'use strict';

angular.module('studentApp', [
  'ngRoute'
])
  .config([
    '$routeProvider',
    function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/home.html',
          controller: 'HomeCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    }
  ])
  /*.controller('HomeCtrl', [
    '$scope',
    function ($scope) {
      $scope.message = 'Hello!';
    }
  ]);*/