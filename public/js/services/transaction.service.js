(function () {

    angular.module('app')
        .factory('TransactionService', TransactionService);

    TransactionService.$inject = ['$http', '$window'];

    function TransactionService($http, $window) {

        return {
            createTab: function (transaction) {
                return $http({
                    url: '/api/transaction',
                    method: 'POST',
                    data: transaction
                });
            },

            findAllTabs: function (userId) {
                return $http.get('/api/transaction/' + userId);
            },

            getTransaction: function (userId, pin) {
                return $http({
                    url: '/api/transaction',
                    method: 'GET',
                    params: {user: userId, pin: pin}
                });
            },
            linkTransactions: function (transaction) {
                return $http({
                    url: '/api/transaction/link',
                    method: 'PUT',
                    data: transaction
                });
            }
        };
    }

})();