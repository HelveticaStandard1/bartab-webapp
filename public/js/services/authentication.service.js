(function () {
    'use strict';
    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', '$location', '$window'];

    function AuthenticationService($http, $cookies, $rootScope, $location, $window) {
        $rootScope.currentUser = $cookies.get('user');
        $cookies.remove('user');

        return {
            login: function (user) {
                return $http.post('/api/login', user)
                    .then(function success(response) {
                        $cookies.put('user', JSON.stringify(response.data._id));
                        $location.path('/');
                        $window.alert('Login Successful');
                    }), function error(data) {
                    $window.alert('Login Failed');
                };
            }
        };
    }

})();