(function () {

    angular.module('app')
        .controller('TabStartController', TabStartController);

    TabStartController.$inject = ['TransactionService', '$cookies', 'LocalService', '$location', '$scope'];

    function TabStartController(TransactionService, $cookies, LocalService, $location, $scope) {

        var vm = this;

        vm.dataLodaing = false;

        if ($cookies.get('user')) {
            vm.user = $cookies.get('user');
        } else {
            $location.path('/login');
        }

        vm.typeSelected = 'user';
        vm.userSelected = false;
        vm.barSelected = false;

        vm.typeSelection = function (userType) {
            if (userType === 'user') {
                vm.barSelected = false;
                vm.userSelected = true;
            } else if (userType === 'bar') {
                vm.userSelected = false;
                vm.barSelected = true;
            }
        };

        vm.tabStartInfo = {
            cardNumber: '1234567891000',
            cardDate: '01/01/2017',
            fullName: 'Nicholas Gregory'
        };

        vm.tabStartFields = [
            {
                key: 'fullName',
                type: 'input',
                name: 'fullName',
                templateOptions: {
                    label: 'Full Name',
                    required: true
                }
            }, {
                key: 'cardNumber',
                type: 'input',
                name: 'cardNumber',
                templateOptions: {
                    label: 'Credit Card Number',
                    required: true
                }
            }, {
                key: 'cardDate',
                type: 'input',
                name: 'cardDate',
                templateOptions: {
                    label: 'Exp. Date',
                    required: true
                }
            }];

        vm.tabStartInfo = {};

        vm.tabStartBarFields = [
            {
                key: 'pin',
                type: 'input',
                name: 'pin',
                templateOptions: {
                    label: 'Enter PIN',
                    required: true
                }
            }];

        function initController() {
            vm.uniquePin = generateUniquePin();
        }

        function generateUniquePin() {
            var min = 0;
            var max = 9999;
            return ('0' + (Math.floor(Math.random() * (max - min + 1)) + min)).substr(-4);
        }

        vm.submitTransaction = function () {
            var user = LocalService.getUserCookie();
            vm.transaction = {
                user: user,
                pin: vm.uniquePin,
                card: {
                    cardNumber: vm.tabStartInfo.cardNumber,
                    cardDate: vm.tabStartInfo.cardDate
                },
                fullName: vm.tabStartInfo.fullName
            };
            TransactionService.createTab(vm.transaction);
            $location.path('/tabdeetz/pin/:' + vm.transaction.pin);
        };

        vm.requestTransaction = function () {
            console.log('Transaction Requested with pin ' + vm.requestPin);
        }

        initController();
    }

})();