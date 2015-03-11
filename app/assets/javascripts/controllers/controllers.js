(function () {
    'use strict';

    angular.module('sudoku.controller', [])
        .controller('SudokuCtrl', ['$scope', '$http', '$q', '$rootScope', '$timeout', 'sudokuService', 'usSpinnerService', SudokuCtrl]);

        //  Note that the order of these matches the order in the above .controller line!
        function SudokuCtrl($scope, $http, $q, $rootScope, $timeout, sudokuService, usSpinnerService) {

            usSpinnerService.stop('spinner-1');

            $scope.disableButtons = false;

            $scope.sudoku = sudokuService.reset();

            var buttonsActive = function(state) {
                var solveBtn = angular.element(document.querySelector( '#solve' ));
                var clearBtn = angular.element(document.querySelector( '#clear' ));
                var resetBtn = angular.element(document.querySelector( '#reset' ));
                solveBtn.prop("disabled",!state);
                clearBtn.prop("disabled",!state);
                resetBtn.prop("disabled",!state);
            };


            $scope.solve = function() {

                buttonsActive(false);
                doSolve();
            }
            var doSolve = function() {
                usSpinnerService.spin('spinner-1');

                    var requestSudoku = [];
                    for(var i=0;i<$scope.sudoku.length;i++) {
                        var requestRow = "";
                        for(var j=0;j<$scope.sudoku[i].length;j++) {
                            requestRow = requestRow.concat($scope.sudoku[i][j]);
                        }
                        requestSudoku.push(requestRow);
                    }

                    console.log("Solving sudoku...")
                    sudokuService.solve(requestSudoku).then(function (data) {
                        for(i=0;i<data.cells.length;i++) {
                            for(j=0;j<data.cells[i].length;j++) {
                                $scope.sudoku[i][j] = data.cells[i][j].fixed_value;
                            }
                        }
                        console.log("Showing solved sudoku...");
                        usSpinnerService.stop('spinner-1');
                        buttonsActive(true);
                    }, (function(data) {
                        alert("There has been an error solving the sudoku");
                        usSpinnerService.stop('spinner-1');
                        buttonsActive(true);
                    }));
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