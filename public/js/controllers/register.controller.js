(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['RegistrationService']

    function RegisterController(RegistrationService) {
        var vm = this;

        vm.registerInfo = {};

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
            RegistrationService.register({
                email: vm.registerInfo.email,
                password: vm.registerInfo.password
            });
        };
    }

})();