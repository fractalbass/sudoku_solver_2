(function () {
    angular.module("sudoku.service", [])
        .service("sudokuService", ['$http', '$q', sudokuService]);

    function sudokuService($http, $q) {

        return {
            solve :solve,
            reset: reset,
            clear: clear
        };

        function solve(sudoku) {
            var deferred = $q.defer();
            console.log("Now attempting to solve " + JSON.stringify(sudoku));
            var req = {
                url: 'sudoku/solve',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: { data: JSON.stringify(sudoku) }
            }

            $http(req).success(function(data, scope) {
                    deferred.resolve(data);
                }).error(function(data, status) {
                  console.error("There was an error: " + status + ": " + data );
                  alert("There was an error solving your puzzle.  Are you sure you entered it correctly?");
                });

            return deferred.promise;
        }

        function clear() {
            return  [
                    ['x','x','x','x','x','x','x','x','x'],
                    ['x','x','x','x','x','x','x','x','x'],
                    ['x','x','x','x','x','x','x','x','x'],
                    ['x','x','x','x','x','x','x','x','x'],
                    ['x','x','x','x','x','x','x','x','x'],
                    ['x','x','x','x','x','x','x','x','x'],
                    ['x','x','x','x','x','x','x','x','x'],
                    ['x','x','x','x','x','x','x','x','x'],
                    ['x','x','x','x','x','x','x','x','x']
                    ];
        }

        function reset() {
            return  [['x','2','3','x','x','x','5','9','x'],
                     ['x','4','1','x','x','x','3','6','x'],
                     ['x','x','x','x','4','x','x','x','x'],
                     ['x','x','2','x','9','x','8','x','x'],
                     ['6','x','8','x','x','x','7','x','9'],
                     ['9','x','x','3','8','6','x','x','2'],
                     ['x','5','x','x','x','x','x','2','x'],
                     ['x','x','6','x','x','x','4','x','x'],
                     ['x','x','x','2','6','5','x','x','x']];


        }
    };
})();
