(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['AuthenticationService'];

    function LoginController(AuthenticationService) {
        var vm = this;

        vm.loginInfo = {};

        vm.loginFields = [
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

        vm.login = function () {
            AuthenticationService.login({
                email: vm.loginInfo.email,
                password: vm.loginInfo.password
            });
        };
    }

})();
