angular.module('userApp', ['appRoutes',
        'userControllers',
        'userServices',
        'ngAnimate',
        'mainControllers',
        'authServices',
        'votersControllers',
        'previewControllers',
        'votersServices',
        'clusterControllers',
        'clusterServices',
        'ui.bootstrap',
        'ui.utils'
    ])
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    });