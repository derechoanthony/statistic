angular.module('userApp', ['appRoutes',
        'userControllers',
        'userServices',
        'ngAnimate',
        'mainControllers',
        'authServices',
        'votersControllers',
        'votersServices',
        'taskforceControllers',
        'taskforceServices'
    ])
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    });