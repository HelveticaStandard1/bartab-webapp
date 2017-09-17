(function () {

    angular.module('app')
        .controller('TabStartController', TabStartController);

    TabStartController.$inject = ['TransactionService', '$cookies', 'LocalService', '$location', 'FlashService', 'socket', '$mdDialog'];

    function TabStartController(TransactionService, $cookies, LocalService, $location, FlashService, socket, $mdDialog) {

        var vm = this;
        vm.timeout = 60000;
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
            vm.user = LocalService.getUserCookie();
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
                patronClientId: vm.clientId
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
        };

        vm.linkTransaction = function () {
            var pin = vm.tabStartBarInfo.pin,
                location = vm.tabStartBarInfo.location,
                status = 'Open',
                clientId = vm.clientId,
                transaction = {
                    pin: pin,
                    location: location,
                    status: status,
                    barClientId: clientId
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
                vm.dataLoading = false;
                console.log(error);
            });
        };

        vm.startUserTransaction = function ($event) {
            var parentEl = angular.element(document.body);
            $mdDialog.show({
                parent: parentEl,
                targetEvent: $event,
                templateUrl: 'startTab.tmpl.html',
                clickOutsideToClose: false,
                controller: DialogController,
                controllerAs: 'dvm'
            });

            function DialogController($timeout, $mdDialog) {
                var dvm = this;
                this.parent = vm;
                dvm.pin = vm.uniquePin;
                dvm.data = {
                    firstLocked: false,
                    secondLocked: true,
                    thirdLocked: true,
                    tabSelected: 1,
                    transactionSubmitted: false,
                    transactionCompleted: false,
                    transactionSuccessful: false,
                    transactionFailed: false
                };

                var selectSecond = function () {
                    dvm.data.secondLocked = false;
                    dvm.data.tabSelected = 2;
                    dvm.data.firstLocked = true;
                    dvm.data.transactionSubmitted = true;
                };

                var selectThird = function () {
                    dvm.data.thirdLocked = false;
                    dvm.data.tabSelected = 3;
                    dvm.data.secondLocked = true;
                    dvm.data.transactionCompleted = true;
                };

                dvm.closeDialog = function () {
                    $mdDialog.hide();
                };

                dvm.cancel = function () {
                    $mdDialog.cancel();
                };

                dvm.viewTab = function () {
                    if (dvm.data.transactionCompleted) {
                        dvm.closeDialog();
                        $location.path('/tabdeetz/').search({pin: vm.uniquePin});
                    } else {
                        dvm.cancel();
                    }
                }

                dvm.generateTransaction = function () {
                    vm.patronClientId = socket.getSocketId();
                    var transaction = {
                        user: vm.user,
                        pin: vm.uniquePin,
                        patronClientId: vm.patronClientId
                    };
                    return transaction;
                };

                dvm.submitRequest = function () {
                    var transaction;
                    selectSecond();
                    transaction = dvm.generateTransaction();
                    var promise = TransactionService.createTab(transaction);
                    promise.then(function (response) {
                        dvm.createResponse = response;
                        console.log('Tab create successful, waiting for bar response for ' + vm.timeout + 'ms');
                        // vm.startTimeOut(vm.timeout); // TODO: implement timeout
                    }, function (error) {
                        console.log('Tab create Unsuccessful, sending to end with message');
                        console.log(error);
                        dvm.data.transactionFailed = true;
                        dvm.message = 'Your transaction failed to link';
                        selectThird();
                    });
                };

                socket.on('Link Request', function (data) {
                    if (data.patronClientId === vm.patronClientId && !dvm.data.transactionFailed) {
                        dvm.message = 'You transaction was successfully linked with: ' + data.location;
                        dvm.data.transactionSuccessful = true;
                        selectThird();
                    } else {
                        console.log('Attempted link from ' + data.barClientId + ' was rejected');
                    }
                });
            }
        };

        initController();
    }

})();