(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$location', '$cookies'];

    function HomeController($location, $cookies) {

        var vm = this;
        var user;

        if ($cookies.get('user')) {
            vm.user = $cookies.get('user');
        } else {
            $location.path('/login');
        }

        vm.startTab = function() {
            $location.path('/tabstart');
        };
    }

})();