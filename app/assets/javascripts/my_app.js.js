(function () {
    'use strict';

    // Declare app level module which depends on views, and components
    angular.module('sudokuApp', [
      "ngRoute",
      "sudoku.service",
      "sudoku.controller",
      "ngAnimate",
      "angularSpinner"
    ]).
    config(['$routeProvider', function($routeProvider) {
      $routeProvider.otherwise({redirectTo: '/view1'});
}]);
})();
