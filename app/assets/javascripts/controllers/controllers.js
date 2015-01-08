(function () {
    'use strict';

    angular.module('sudoku.controller', [])
        .controller('SudokuCtrl', ['$scope', '$http', '$q', '$rootScope', '$timeout', 'sudokuService', SudokuCtrl]);

        //  Note that the order of these matches the order in the above .controller line!
        function SudokuCtrl($scope, $http, $q, $rootScope, $timeout, sudokuService) {

            $scope.sudoku = sudokuService.reset();

            $scope.solve = function() {

                var promise = sudokuService.solve($scope.sudoku);
                promise.then( function(data) {
                    $scope.sudoku = data;
                });
            };

            $scope.setSolution = function(solution) {
                $scope.sudoku = solution;
            };

            $scope.reset = function () {
                $scope.sudoku = sudokuService.reset();
            };


        };
})();