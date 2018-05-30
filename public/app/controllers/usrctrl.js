angular.module('userControllers', ['userServices', 'authServices'])
    .controller('regCtrl', function($http, $location, $timeout, User, $scope, Auth) {
        var app = this;
        app.userentry = true;
        app.preview = false;
        app.update = false;
        app.dataid = "";
        $scope.title = "User Form";

        this.reloaduser = function(callback) {
            User.userlist().then(function(params) {
                if (params.data.length > 0) {
                    callback(params.data);
                }
            });
        };
        this.userpreview = function(id) {
            var msg = " Searching user id " + id + ".";
            $.notify(msg, {
                position: "top right'",
                className: "info",
                style: 'bootstrap',
                hideDuration: 400,
            });
            User.userpreview(id).then(function(params) {
                var data = params.data;
                app.dataid = data._id;
                app.p_fname = data.fname;
                app.p_mname = data.mname;
                app.p_lname = data.lname;
                app.p_uname = data.username;
                app.p_pwd = data.pwd;
                app.p_usrtype = data.usrtype;
                app.p_status = data.status;
                if (data.status == 'active') {
                    $('#p_status').css('color', 'green');
                } else {
                    $('#p_status').css('color', 'red');
                }
            });
            app.userentry = false;
            app.preview = true;
            app.update = false;
        }
        this.newPwd = function(data) {
            app.u_pwd = app.genpwd();
        }
        this.userupdate = function(id) {
            var msg = " Searching user id " + id + ".";
            $.notify(msg, {
                position: "top right'",
                className: "info",
                style: 'bootstrap',
                hideDuration: 400,
            });
            User.userpreview(id).then(function(params) {
                var data = params.data;
                app.dataid = data._id;
                app.u_fname = data.fname;
                app.u_mname = data.mname;
                app.u_lname = data.lname;
                app.u_uname = data.username;
                app.u_pwd = data.pwd;
                app.u_usrtype = data.usrtype;
            });
            app.userentry = false;
            app.preview = false;
            app.update = true;
        };
        this.updateUserData = function(id) {
            var data = {};
            Auth.getUser().then(function(res) {
                data.fname = app.u_fname;
                data.mname = app.u_mname;
                data.lname = app.u_lname;
                data.username = app.u_uname;
                data.pwd = app.u_pwd;
                data.password = app.u_pwd;
                data.usrtype = app.u_usrtype;
                data.created = res.data.id;
                data.status = 'active';
                User.userupdate(data, id).then(function(res) {
                    if (res.data.code == 200) {
                        app.reloaduser(function(res_usrlist) {
                            console.log(res.data.msg.msg);
                            var msg = "User Id " + id + " " + res.data.msg.msg;
                            $.notify(msg, {
                                position: "top right'",
                                className: "success",
                                style: 'bootstrap',
                                hideDuration: 400,
                            });
                            app.fname = "";
                            app.mname = "";
                            app.lname = "";
                            app.username = "";
                            app.pwd = "";
                            app.password = "";
                            app.usrtype = "";
                            app.created = "";
                            app.status = "";
                            app.userlist = res_usrlist;
                            app.userentry = true;
                            app.preview = false;
                            app.update = false;
                        });
                    } else {
                        $.notify(res.data.msg, {
                            position: "top right'",
                            className: "error",
                            style: 'bootstrap',
                            hideDuration: 400,
                        });
                    }
                });
            });
        };
        this.userdeactivate = function(id) {
            console.log(id);
            User.userstatus(id, "0").then(function(params) {
                console.log(params);
                if (params.data.code == 200) {
                    app.reloaduser(function(res_usrlist) {

                        app.userlist = res_usrlist;
                    });
                    $.notify('User ID ' + id + ' successfully deactivated!', {
                        position: "top right'",
                        className: "error",
                        style: 'bootstrap',
                        hideDuration: 400,
                    });

                } else {
                    $.notify('Something went wrong upon deactivation process..', {
                        position: "top right'",
                        className: "error",
                        style: 'bootstrap',
                        hideDuration: 400,
                    });
                }
            });
        };
        this.useractivate = function(id) {
            User.userstatus(id, "1").then(function(params) {
                if (params.data.code == 200) {
                    $.notify('User ID ' + id + ' successfully deactivated!', {
                        position: "top right'",
                        className: "error",
                        style: 'bootstrap',
                        hideDuration: 400,
                    });
                } else {
                    $.notify('Something went wrong upon deactivation process..', {
                        position: "top right'",
                        className: "error",
                        style: 'bootstrap',
                        hideDuration: 400,
                    });
                }
            });
        };
        this.regUser = function(regData) {
            var pwd = app.genpwd();
            app.errorMsg = false;
            app.loading = true;
            app.regData.password = pwd;
            app.regData.pwd = pwd;
            app.regData.status = 'active';
            Auth.getUser().then(function(data) {
                app.regData.created = data.data.id;
                User.create(app.regData).then(function(params) {
                    if (params.data.success) {
                        app.reloaduser(function(res) {
                            $.notify(params.data.msg, {
                                position: "top right'",
                                className: "success",
                                style: 'bootstrap',
                                hideDuration: 400,
                            });
                            app.regData.created = "";
                            app.regData.fname = "";
                            app.regData.lname = "";
                            app.regData.mname = "";
                            app.regData.password = "";
                            app.regData.pwd = "";
                            app.regData.status = "";
                            app.regData.username = "";
                            app.regData.usrtype = "";
                            app.userlist = res;
                        });
                    } else {
                        $.notify(params.data.msg, {
                            position: "top right'",
                            className: "info",
                            style: 'bootstrap',
                            hideDuration: 400,
                        });
                    }
                });
            });
        };
        this.reloaduser(function(res) {
            app.userlist = res;
            console.log(res);
        });
        this.genpwd = function() {
            var length = 8,
                charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
                retVal = "";
            for (var i = 0, n = charset.length; i < length; ++i) {
                retVal += charset.charAt(Math.floor(Math.random() * n));
            }
            return retVal
        };
    });