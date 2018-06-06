angular.module('userApp', ['appRoutes',
        'userControllers',
        'userServices',
        'ngAnimate',
        'mainControllers',
        'authServices',
        'votersControllers',
        'votersServices',
        'clusterControllers',
        'clusterServices',
        'ui.bootstrap',
        'ui.utils'
    ])
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    });