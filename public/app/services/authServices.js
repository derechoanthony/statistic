angular.module('authServices',[])
    .factory('Auth', function ($http,$window, AuthToken) {
        var authFactory = {};
        authFactory.login = function (loginData) {
            return $http.post('/api/authenticate', loginData).then(function(params) {
                AuthToken.setToken(params.data.token);
                return params;
            });
        };

        authFactory.isLogIn = function () {
            if (AuthToken.getToken ()){
                return true;
            }else{
                return false;
            }
            // var cockie = $window.localStorage.getItem('token');
            // if(cockie !=null){
            //     return true;
            // }else{
            //     return false;
            // }

        };

        authFactory.getUser = function () {
            if (AuthToken.getToken()) {
                return $http.post('/api/me')
            }else{
                $q.reject({message:'User has no token'});
            }
        };
        
        authFactory.logout = function() {
          AuthToken.setToken();  
          console.log('>>>logout');
        };
        return authFactory;
    })
    .factory('AuthToken',function($window) {
        var authTokenFactory = {};
        authTokenFactory.setToken = function(token) {
            console.log(token);
            if (token){
                console.log("set item")
                $window.localStorage.setItem('token', token);
            }
            if (token == undefined) {
               $window.localStorage.removeItem('token');
            }
        };

        authTokenFactory.getToken = function() {
          return $window.localStorage.getItem('token');
        };

        return authTokenFactory;
    })
    .factory('AuthInterceptor', function (AuthToken) {
        var AuthInterceptorFactory = {};
        
        AuthInterceptorFactory.request = function (config) {
            
            var token = AuthToken.getToken()
            if(token) config.headers['x-access-token'] = token
            return config;
        };

        return AuthInterceptorFactory;
    });