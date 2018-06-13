angular.module('userServices', [])
    .factory('User', function($http) {
        userFactory = {};
        userFactory.create = function(regData) {
            return $http.post('/api/user', regData);
        };
        userFactory.userlist = function() {
            return $http.get('/api/user/list');
        };
        userFactory.userpreview = function(id) {
            var str1 = "/api/user/";
            var str2 = id;
            var str3 = "/preview";
            var res = str1.concat(str2, str3);
            return $http.get(res);
        };
        userFactory.userupdate = function(data, id) {
            var str1 = '/api/user/';
            var str2 = id;
            var str3 = '/update';
            var res = str1.concat(str2, str3);
            return $http.post(res, data);
        };
        userFactory.userstatus = function(id, type) {
            var str1 = '/api/user/';
            var str2 = id;
            var str3 = '/deactivate';
            var res = str1.concat(str2, str3);
            console.log(res);
            var data = {};
            if (type == "1") {
                data.status = 'active';
            } else {
                data.status = 'Inactive';
            }
            console.log(data);
            return $http.post(res, data);
        };
        return userFactory;
    });