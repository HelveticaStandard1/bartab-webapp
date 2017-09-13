(function () {

        angular.module('app')
            .controller('TabStartController', TabStartController);

        TabStartController.$inject = ['TransactionService', '$cookies', 'LocalService', '$location', 'FlashService'];

        function TabStartController(TransactionService, $cookies, LocalService, $location, FlashService) {

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

            vm.tabStartInfo = {};

            vm.tabStartFields = [
                {
                    key: 'fullName',
                    type: 'input',
                    name: 'fullName',
                    templateOptions: {
                        label: 'Full Name',
                        required: true
                    }
                }];

            vm.tabStartBarInfo = {};

            vm.tabStartBarFields = [
                {
                    key: 'pin',
                    type: 'input',
                    name: 'pin',
                    templateOptions: {
                        label: 'Enter PIN',
                        required: true
                    }
                },
                {
                    key: 'location',
                    type: 'input',
                    name: 'location',
                    templateOptions: {
                        label: 'Enter Location Name',
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
                var pin = vm.uniquePin;
                vm.transaction = {
                    user: user,
                    pin: vm.uniquePin,
                    card: {
                        cardNumber: vm.tabStartInfo.cardNumber,
                        cardDate: vm.tabStartInfo.cardDate
                    },
                    fullName: vm.tabStartInfo.fullName
                };
                var promise = TransactionService.createTab(vm.transaction);
                promise.then(function success(response) {
                    window.alert('Transaction creation Successful!');
                    // FlashService.Success('Transaction creation Successful!', true);
                    $location.path('/tabdeetz/').search({pin: pin});
                }, function error(response) {
                    window.alert('Transaction creation failed');
                    // FlashService.Error('Transaction creation failed', false);
                });
            }

            vm.linkTransaction = function () {
                var pin = vm.tabStartBarInfo.pin;
                var location = vm.tabStartBarInfo.location;
                var status = 'Open';
                var transaction = {
                    pin: pin,
                    location: location,
                    status: status
                };
                vm.dataLoading = true;
                var promise = TransactionService.linkTransactions(transaction);
                promise.then(function (response) {
                    vm.data = response.data;
                    vm.dataLoading = false;
                    window.alert('Link creation Successful!');
                    $location.path('/tabdeetz/').search({pin: response.data.pin});
                }, function (error) {
                    window.alert('Link creation Failed!');
                    console.log(error);
                });
            }

            initController();
        }

    })();