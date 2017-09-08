(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    function RegisterController(UserService, $location, $rootScope, FlashService, RegisterService) {
        var vm = this;

        vm.register = {};

        vm.registerFields = [
            {
                key: 'email',
                type: 'input',
                name: 'email',
                templateOptions: {
                    type: 'email',
                    label: 'Email',
                    required: true
                }
            }, {
                key: 'password',
                type: 'input',
                name: 'password',
                templateOptions: {
                    type: 'password',
                    label: 'Password',
                    required: true
                }
            }];

        vm.register = function() {
            vm.dataLoading = true;
            RegisterService.save(vm.user, function() {
                    vm.dataLoading = false;
                    FlashService.Success('Successfully Registered!', true);
                    $location.path('/login');
                },
                function() {
                    vm.dataLoading = false;
                    FlashService.Error('Error occurred.  Please try again!', true);

                });
        }
    }

})();