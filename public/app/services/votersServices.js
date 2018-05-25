angular.module('votersServices', [])
    .factory('voters', function($http) {
        votersFactory = {};
        votersFactory.create = function(votersdata) {
            return $http.post('/api/voters/upload/data', votersdata);
        };
        return votersFactory;
    });