angular.module('app')
  .config([
    '$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          template: '<page-home></page-home>'
        })
				.when('/queryTest', {
					template: '<query-test></query-test>'
				})
        .otherwise({
          redirectTo: '/',
        });

      //$locationProvider.html5Mode(true);
    }
  ]);