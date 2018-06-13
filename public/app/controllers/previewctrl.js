angular.module('previewControllers', ['authServices', 'clusterServices', 'userServices'])
    .controller('previewCtrl', function($http, $location, $timeout, User, Auth, cluster, $routeParams, $scope, $rootScope) {
        var app = $scope;
        Auth.getUser().then(function(data) {
            app.uid = data.data.id;
            if (($scope.uid == app.uid) && Auth.isLogIn()) {
                switch ($routeParams.type) {
                    case "brngycluster":
                        cluster.brngycluster($routeParams.id).then(function(p) {
                            var result = p.data;
                            if (result.success == true) {
                                app.brngyname = $routeParams.id;
                                app.clusterbrngydata = result.msg;
                            } else {
                                $location.path("/dashboard");
                            }
                        });
                        break;
                    case "f1pr3v13w":
                        var q_url = $routeParams.q.split('!');
                        app.barangayname = $routeParams.id;
                        var q = {
                            "lname": q_url[0],
                            "fname": q_url[1],
                            "mname": q_url[2],
                            "brngy": $routeParams.id
                        }
                        cluster.familylist(q).then(function(p) {
                            var result = p.data;
                            if (result.success == true) {
                                var jsondata = [];
                                app.familydata = result.data;
                            } else {
                                $location.path("/dashboard");
                            }
                        });
                        break;
                }

            } else {
                $location.path('/dashboard');
            }
        });

    });