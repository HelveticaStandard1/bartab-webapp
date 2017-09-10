(function () {

    angular.module('app')
        .controller('TabHistoryController', TabHistoryController);

    TabHistoryController.$inject = ['TransactionService', 'LocalService', '$cookies', '$location'];

    function TabHistoryController(TransactionService, LocalService, $cookies, $location) {

        var vm = this;

        vm.dataLoading = true;

        if ($cookies.get('user')) {
            vm.user = $cookies.get('user');
        } else {
            $location.path('/login');
        }

        function findTransactions() {
            var user = LocalService.getUserCookie();
            vm.dataLoading = true;
            var promise = TransactionService.findAllTabs(user);
            promise.then(function (response) {
                vm.data = response.data;
                vm.dataLoading = true;
            }, function (error) {
                console.log(error);
            });
        }

        findTransactions();

    }

})();