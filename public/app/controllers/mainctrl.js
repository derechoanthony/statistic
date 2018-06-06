angular.module('mainControllers', ['authServices'])
    .controller('mainCtrl', function($http, $location, $timeout, Auth, $rootScope) {
        var app = this;
        app.loadme = false;
        app.isloggedIn = false;
        $rootScope.$on('$routeChangeStart', function() {
            if (Auth.isLogIn()) {
                app.isloggedIn = true;
                Auth.getUser().then(function(data) {
                    app.uid = data.data.id;
                    app.username = data.data.username;
                    app.loadme = true;
                });
                if ($location.$$url === "/") {
                    $location.path('/dashboard');
                }
            } else {
                app.uid = '';
                app.username = '';
                app.isloggedIn = false;
                app.loadme = true;
                $location.path('/');
            }
            console.log(app.isloggedIn)
        });
        console.log($location.$$url);

        this.dologin = function(loginData) {
            app.errorMsg = false;
            app.loading = true;
            Auth.login(app.loginData).then(function(params) {
                // console.log(params.data)
                if (params.data.success) {
                    app.loading = false;
                    app.successMsg = params.data.msg + '... Redirecting.';
                    $timeout(function() {
                        $location.path('/home');
                        app.loginData = '';
                        app.successMsg = false;
                    }, 2000);
                } else {
                    app.loading = false;
                    app.errorMsg = params.data.msg;
                }
            });
        };
        this.logout = function() {
            Auth.logout();
            $location.path('/logout');
            $timeout(function() {
                $location.path('/');
            }, 1000);
        };
        // booking list
        this.bookinglist = function() {
            data = {};
            data.bookingdata = function() {
                return { test: "test" };
            };
            return data;
        };
    });