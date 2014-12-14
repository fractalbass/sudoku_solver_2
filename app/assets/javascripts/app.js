(function () {
    'use strict';

    var sudoku_solver_2 = angular.module('sudoku_solver_2', [
        "ngRoute",
        "sudoku.service",
        "sudoku.controller",
        "ngAnimate"
    ]).
        config(['$routeProvider', function ($routeProvider) {
            $routeProvider.otherwise({redirectTo: '/home#index.html.erb'});
        }]);
});