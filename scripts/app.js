'use strict';

// declare modules
angular.module('Random', []);
angular.module('Mixto', []);
angular.module('Multiplicativo', []);
angular.module('SimulacioneApp', [
    'Random',
    'Mixto',
    'Multiplicativo',
    'ngRoute',
    'ui.bootstrap',
    'angular-confirm',
    'ui-notification',
    ])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when('/random', {
        controller: 'RandomController',
        templateUrl: 'modules/random/views/random.html'
    })
    .when('/multiplicativo', {
        controller: 'MultiplicativoController',
        templateUrl: 'modules/multiplicativo/views/multiplicativo.html'
    })
    .when('/mixto', {
        controller: 'MixtoController',
        templateUrl: 'modules/mixto/views/mixto.html'
    })
    .otherwise({ redirectTo: '/random' });
}])

.run(['$rootScope', '$location', '$http',
    function ($rootScope, $location, $http) {	
		
        
    }]);