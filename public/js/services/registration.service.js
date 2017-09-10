(function () {
    'use strict';
    angular
        .module('app')
        .factory('RegistrationService', RegistrationService);

    RegistrationService.$inject = ['$http', '$rootScope', '$location', '$window', '$cookies'];

    function RegistrationService($http, $rootScope, $location, $window, $cookies) {

        return {
            register: function (user) {
                return $http.post('/api/register', user)
                    .then(function success(response) {
                        $cookies.put('user', JSON.stringify(response.data._id));
                        $location.path('/home');
                        $window.alert('Registration Successful');
                    }), function error(data) {
                    $window.alert('Registration Failed');
                };
            }
        };
    }

})();