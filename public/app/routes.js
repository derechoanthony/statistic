angular.module('appRoutes', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
                templateUrl: 'app/views/pages/users/login.html'
            }).when('/dashboard', {
                templateUrl: 'app/views/pages/home.html'
            }).when('/about', {
                templateUrl: 'app/views/pages/about.html'
            }).when('/register', {
                templateUrl: 'app/views/pages/users/register.html',
                controller: 'regCtrl',
                controllerAs: 'register'
            }).when('/taskforce', {
                templateUrl: 'app/views/pages/taskforce/index.html',
                controller: 'taskforceCtrl',
                controllerAs: 'taskforce'
            }).when('/comelec-data', {
                templateUrl: 'app/views/pages/comelec/uploadcsv.html',
                controller: 'votersCtrl',
                controllerAs: 'voterscsv'
            }).when('/login', {
                templateUrl: 'app/views/pages/users/login.html'
            }).when('/logout', {
                templateUrl: 'app/views/pages/users/logout.html'
            })
            .when('/profile', {
                templateUrl: 'app/views/pages/users/profile.html'
            }).otherwise({ redirectTo: '/dashboard' })

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });