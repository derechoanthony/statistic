angular.module('taskforceServices', [])
    .factory('taskforce', function($http) {
        taskforceFactory = {};
        // votersFactory.create = function (votersdata) {
        //     return $http.post('/api/voters/upload/data', votersdata);
        // };
        return taskforceFactory;
    });