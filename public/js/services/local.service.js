(function () {

    angular.module('app')
        .factory('LocalService', LocalService);

    LocalService.$inject = ['$cookies'];

    function LocalService($cookies) {
        return {
            getUserCookie: function () {
                var userObject = $cookies.get('user');
                var user = JSON.parse(userObject);
                return user;
            }
        };
    }

})();