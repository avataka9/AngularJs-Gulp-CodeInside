angular.module('studentApp')
  .config([
    '$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          template: '<page-home></page-home>'
        })
        .otherwise({
          redirectTo: '/'
        });

      //$locationProvider.html5Mode(true);
    }
  ]);