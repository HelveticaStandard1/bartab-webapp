(function () {

    var app = angular.module('app');

    app.factory('RegisterService', function ($resource) {
        return $resource('/register');
    });


})();