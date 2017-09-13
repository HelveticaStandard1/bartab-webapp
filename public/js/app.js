(function () {

    var app = angular.module('app', ['ngResource', 'ngRoute', 'ngCookies', 'formly', 'formlyBootstrap']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/home.ejs',
                controller: 'HomeController',
                controllerAs: 'vm'
            })
            .when('/login', {
                templateUrl: '/partials/login.ejs',
                controller: 'LoginController',
                controllerAs: 'vm'
            })
            .when('/register', {
                templateUrl: '/partials/register.ejs',
                controller: 'RegisterController',
                controllerAs: 'vm'
            })
            .when('/tabstart', {
                templateUrl: '/partials/tabstart.ejs',
                controller: 'TabStartController',
                controllerAs: 'vm'
            })
            .when('/profile', {
                templateUrl: '/partials/profile.ejs',
                controller: 'ProfileController',
                controllerAs: 'vm'
            })
            .when('/tabhistory',{
                templateUrl: '/partials/tabhistory.ejs',
                controller: 'TabHistoryController',
                controllerAs: 'vm'
            })
            .when('/tabdeetz',{
                templateUrl: '/partials/tabdeetz.ejs',
                controller: 'TabDeetzController',
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
        $rootScope.user = $cookies.get('user') || {};
        if ($rootScope.user) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.user;
        }

        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.user;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }
})();
