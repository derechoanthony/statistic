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
            }).when('/cluster', {
                // task -> taskforce
                templateUrl: 'app/views/pages/cluster/index.html',
                controller: 'clusterCtrl',
                controllerAs: 'cluster'
            }).when('/comelec-data', {
                templateUrl: 'app/views/pages/comelec/uploadcsv.html',
                controller: 'votersCtrl',
                controllerAs: 'voterscsv'
            }).when('/brngy/cluster/data/:id/user/:uid/type/:type', {
                templateUrl: 'app/views/pages/cluster/preview.html',
                controller: 'previewCtrl',
                controllerAs: 'previewdata'
            })
            .when('/brngy/family/data/:id/user/:uid/type/:type', {
                templateUrl: 'app/views/pages/cluster/familyperview.html',
                controller: 'previewCtrl',
                controllerAs: 'previewfamdata'
            })

        .when('/login', {
                templateUrl: 'app/views/pages/users/login.html'
            })
            .when('/logout', {
                templateUrl: 'app/views/pages/users/logout.html'
            })
            .when('/profile', {
                templateUrl: 'app/views/pages/users/profile.html'
            })
            .otherwise({
                redirectTo: '/dashboard'
            });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });