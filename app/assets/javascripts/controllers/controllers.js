(function () {
    'use strict';

    angular.module('sudoku.controller', [])
        .controller('SudokuCtrl', ['$scope', '$http', '$q', '$rootScope', '$timeout', 'sudokuService', SudokuCtrl]);

        //  Note that the order of these matches the order in the above .controller line!
        function SudokuCtrl($scope, $http, $q, $rootScope, $timeout, sudokuService) {



            $scope.sudoku = sudokuService.reset();

            $scope.solve = function() {
                var requestSudoku = [];
                for(var i=0;i<$scope.sudoku.length;i++) {
                    var requestRow = "";
                    for(var j=0;j<$scope.sudoku[i].length;j++) {
                        requestRow = requestRow.concat($scope.sudoku[i][j]);
                    }
                    requestSudoku.push(requestRow);
                }

                var promise = sudokuService.solve(requestSudoku);
                promise.then( function(data) {
                    for(i=0;i<data.cells.length;i++) {
                        for(j=0;j<data.cells[i].length;j++) {
                            $scope.sudoku[i][j] = data.cells[i][j].fixed_value;
                        }
                    }
                });
            };

            $scope.setSolution = function(solution) {
                $scope.sudoku = solution;
            };

            $scope.reset = function () {
                $scope.sudoku = sudokuService.reset();
            };

            $scope.clear = function() {
                $scope.sudoku = sudokuService.clear();
            };

        };
})();