angular.module('sudokuApp', [])
    .directive('phgSudokuCell', function() {
        return {
            templateUrl: 'templates/phgSudokuCell.html'
        };
    });