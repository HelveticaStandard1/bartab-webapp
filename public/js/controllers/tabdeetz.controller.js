(function () {

    angular.module('app')
        .controller('TabDeetzController', TabDeetzController);

    TabDeetzController.$inject = ['$location', 'TransactionService', '$cookies'];

    function TabDeetzController($location, TransactionService, $cookies) {

        var vm = this;

        vm.dataLoading = true;

        if ($cookies.get('user')) {
            vm.user = $cookies.get('user');
        } else {
            $location.path('/login');
        }

        vm.deetz = $location.search('pin');

        console.log(vm.deetz);
    }

})();