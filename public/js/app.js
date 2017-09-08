(function () {

    var app = angular.module('app', ['ngResource', 'ngRoute', 'ngCookies', 'formly', 'formlyBootstrap']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: '/partials/login.ejs',
                controller: 'LoginController',
                controllerAs: 'vm'
            })
            .when('/register', {
                templateUrl: '/partials/register.html',
                controller: 'RegisterController',
                controllerAs: 'vm'
            })
            .when('/tabstart', {
                templateUrl: '/partials/tabstart.html',
                controller: 'MapController',
                controllerAs: 'vm'
            })
            .when('/profile', {
                templateUrl: '/partials/profile.html',
                controller: 'ProfileController',
                controllerAs: 'vm'
            })
            .otherwise({redirectTo: '/'});
    }]);

    app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode(true);
    }]);

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];

    function run($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                //$location.path('/login');
            }
        });
    }
})();
