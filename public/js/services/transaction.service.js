(function () {

    angular.module('app')
        .factory('TransactionService', TransactionService);

    TransactionService.$inject = ['$http', '$window'];

    function TransactionService($http, $window) {

        return {
            createTab: function (transaction) {
                return $http.post('/api/transaction', transaction)
                    .then(function success(response) {
                        $window.alert('Transaction Created Successfully!');
                    }), function error(response) {
                    $window.alert('Transaction creation failed');
                };
            },

            findAllTabs: function (userId) {
                return $http.get('/api/transaction/' + userId);
            }
        };
    }

})();