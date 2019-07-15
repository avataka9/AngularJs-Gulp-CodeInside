'use strict';

angular.module('studentApp', [/*'ngSanitize', 'ngRoute', 'ui.bootstrap'*/])
  /*.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/index.html',
        controller: 'MainCtrl'
      })
      .when('/sample', {
        templateUrl: 'app/sample/index.html',
        controller: 'SampleCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })*/
/*
  .controller('NavBarCtrl', ['$scope', function ($scope) {
    $scope.isCollapsed = true;
  }])*/
  .controller('headerCtrl', ['$scope', function ($scope) {
    //$scope.isCollapsed = true;
    $scope.phone = {

      name: 'Nokia Lumia 630',
      year: 2014,
      price: 200,
      company: {
        name: 'Nokia',
        country: 'Финляндия'
      }
    }
  }])

;