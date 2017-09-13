(function () {

    angular.module('app')
        .controller('TabDeetzController', TabDeetzController);

    TabDeetzController.$inject = ['LocalService', '$location', 'TransactionService', '$cookies'];

    function TabDeetzController(LocalService, $location, TransactionService, $cookies) {

        var vm = this;

        vm.dataLoading = true;

        if ($cookies.get('user')) {
            vm.user = $cookies.get('user');
        } else {
            $location.path('/login');
        }

        vm.deetz = $location.search();

        function lookupTransaction() {
            var user = LocalService.getUserCookie();
            var deetz = vm.deetz.pin;
            vm.dataLodading = true;
            var promise = TransactionService.getTransaction(user, deetz);
            promise.then(function (response) {
                vm.data = response.data;
                vm.dataLoading = false;
            }, function (error) {
                console.log(error);
            });
        }

        lookupTransaction();
        console.log(vm.deetz);
    }

})();