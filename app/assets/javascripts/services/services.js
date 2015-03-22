(function () {
    angular.module("sudoku.service", [])
        .service("sudokuService", ['$http', '$q', sudokuService]);

    function sudokuService($http, $q) {

        return {
            solve :solve,
            reset: reset,
            clear: clear
        };

        function solve(sudoku, maxiter) {
            var deferred = $q.defer();
            console.log("Now attempting to solve " + JSON.stringify(sudoku));
            var req = {
                url: 'sudoku/solve',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: { data: JSON.stringify(sudoku), maxiter: maxiter }
            }

            $http(req).success(function(data, scope) {
                    deferred.resolve(data);
                }).error(function(data, status) {
                    deferred.reject(data);
                  console.error("There was an error: " + status + ": " + data );
                });

            return deferred.promise;
        }

        function clear() {
            return  [
                    [' ',' ',' ',' ',' ',' ',' ',' ',' '],
                    [' ',' ',' ',' ',' ',' ',' ',' ',' '],
                    [' ',' ',' ',' ',' ',' ',' ',' ',' '],
                    [' ',' ',' ',' ',' ',' ',' ',' ',' '],
                    [' ',' ',' ',' ',' ',' ',' ',' ',' '],
                    [' ',' ',' ',' ',' ',' ',' ',' ',' '],
                    [' ',' ',' ',' ',' ',' ',' ',' ',' '],
                    [' ',' ',' ',' ',' ',' ',' ',' ',' '],
                    [' ',' ',' ',' ',' ',' ',' ',' ',' ']
                    ];
        }

        function reset() {
            return  [[' ','2','3',' ',' ',' ','5','9',' '],
                     [' ','4','1',' ',' ',' ','3','6',' '],
                     [' ',' ',' ',' ','4',' ',' ',' ',' '],
                     [' ',' ','2',' ','9',' ','8',' ',' '],
                     ['6',' ','8',' ',' ',' ','7',' ','9'],
                     ['9',' ',' ','3','8','6',' ',' ','2'],
                     [' ','5',' ',' ',' ',' ',' ','2',' '],
                     [' ',' ','6',' ',' ',' ','4',' ',' '],
                     [' ',' ',' ','2','6','5',' ',' ',' ']];


        }
    };
})();
