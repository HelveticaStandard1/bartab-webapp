(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];

    function LoginController($location, AuthenticationService, FlashService) {
        var vm = this;

        vm.login = {};

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
    }

})();
