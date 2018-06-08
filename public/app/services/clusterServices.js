angular.module('clusterServices', [])
    .factory('cluster', function($http) {
        clusterFactory = {};
        clusterFactory.create = function(votersdata) {
            return $http.post('/api/create/cluster', votersdata);
        };
        clusterFactory.barangaylist = function() {
            return $http.get('/api/brangay/list')
        };
        clusterFactory.sitiolist = function(data) {
            var d = { "data": data };
            return $http.post("/api/sitio/list", d);
        };
        clusterFactory.brngycount = function() {
            return $http.get('api/brangay/record/count');
        }
        return clusterFactory;
    });