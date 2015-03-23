(function () {
    'use strict';

    angular.module('sudoku.controller', [])
        .controller('SudokuCtrl', ['$scope', '$http', '$q', '$rootScope', '$timeout', 'sudokuService', 'usSpinnerService', '$animate', SudokuCtrl]);

        //  Note that the order of these matches the order in the above .controller line!
        function SudokuCtrl($scope, $http, $q, $rootScope, $timeout, sudokuService, usSpinnerService, $animate) {

            usSpinnerService.stop('spinner-1');
            $scope.showSudoku = true;
            $scope.maxiter = 10000;
            $scope.disableButtons = false;
            var element = angular.element(document.querySelector( '.sudokubox' ));
            $scope.sudoku = sudokuService.reset();

            var buttonsActive = function(state) {
                //  This is done because the ng-disabled doesn't work well when you are
                //  trying to disable the same button you just clicked on.
                var solveBtn = angular.element(document.querySelector( '#solve' ));
                var clearBtn = angular.element(document.querySelector( '#clear' ));
                var resetBtn = angular.element(document.querySelector( '#reset' ));
                solveBtn.prop("disabled",!state);
                clearBtn.prop("disabled",!state);
                resetBtn.prop("disabled",!state);
            };


            $scope.solve = function() {
                $animate.addClass(element, "fade");
                buttonsActive(false);
                doSolve();
            }


            function animateSudoku() {
                return $q(function (resolve) {
                   console.log("Now clearing...");
                   resolve();
                });
            }

            var doSolve = function() {
                animateSudoku().then(function() {
                    console.log("Now solving...");
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
                    sudokuService.solve(requestSudoku, $scope.maxiter).then(function (data) {
                        if (data==null) {
                            alert("Darn!  Either we exceeded the 30 second time limit, or you entered an invalid puzzle.  Please correct the puzzle, or enter a different one.");
                        }
                        else{
                            for(i=0;i<data.cells.length;i++) {
                                for(j=0;j<data.cells[i].length;j++) {
                                    $scope.sudoku[i][j] = data.cells[i][j].fixed_value;
                                }
                            }
                            console.log("Showing solved sudoku...");
                        }
                        usSpinnerService.stop('spinner-1');
                        $animate.removeClass(element, "fade");
                        buttonsActive(true);
                    }, (function(data) {
                        usSpinnerService.stop('spinner-1');
                        alert("Darn!  Either we exceeded the 30 second time limit, or you entered an invalid puzzle.  Please correct the puzzle, or enter a different one.");
                        buttonsActive(true);
                        $animate.removeClass(element, "fade");
                    }));
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