angular.module('mainControllers', ['authServices'])
    .controller('mainCtrl', function($http, $location, $timeout, Auth, $rootScope) {
        var app = this;
        app.loadme = false;
        //  app.data = bookinglist();
        $rootScope.$on('$routeChangeStart', function() {
            if (Auth.isLogIn()) {
                app.isloggedIn = true;
                Auth.getUser().then(function(data) {
                    // console.log(data.data.id);
                    app.uid = data.data.id;
                    app.username = data.data.username;
                    app.email = data.data.email;
                    app.loadme = true;
                });
                // app.calendardata = bookinglist;
            } else {
                // console.log("Failed: User is not log in");
                app.uid = '';
                app.username = '';
                app.email = '';
                app.isloggedIn = false;
                app.loadme = true;
                // app.calendardata = {};
            }
        });
        // console.log('uid>>', app[0].uid)
        this.dologin = function(loginData) {
            app.errorMsg = false;
            app.loading = true;
            Auth.login(app.loginData).then(function(params) {
                // console.log(params.data)
                if (params.data.success) {
                    app.loading = false;
                    app.successMsg = params.data.msg + '... Redirecting.';
                    $timeout(function() {
                        $location.path('/about');
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
            }, 2000);
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