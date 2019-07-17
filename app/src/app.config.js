angular.module('studentApp')
  .config([
    '$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          template: '<page-home></page-home>'
        })
        .otherwise({
          //redirectTo: '/',
					template: '<page-404></page-404>'
        });

      $locationProvider.html5Mode(true);
    }
  ]);