(function () {
    angular.module("sudoku.service", [])
        .service("sudokuService", ['$http', '$q', sudokuService]);

    function sudokuService($http, $q) {

        return {
            solve :solve,
            reset: reset
        };

        function solve(scope) {
            var deferred = $q.defer();

            var req = {
                url: 'sudoku/solve',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: { test: 'test'}
            }

            $http(req).success(function(data, scope) {
                    deferred.resolve(data);
                }).error(function(data, status) {
                  console.error("There was an error: " + status + ": " + data );
                });

            return deferred.promise;
        }

        function reset() {
            return [
                "5xx4x67xx",
                "xxx5xx9xx",
                "2xxx17x4x",
                "xxx72xx1x",
                "9xxxxxxx8",
                "x7xx68xxx",
                "x3x27xxx5",
                "xx4xx3xxx",
                "xx26x4xx3"];
        }
    };
})();
