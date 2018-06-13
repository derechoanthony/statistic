angular.module('clusterServices', [])
    .factory('cluster', function($http) {
        clusterFactory = {};
        clusterFactory.create = function(votersdata) {
            return $http.post('/api/create/cluster', votersdata);
        };
        clusterFactory.barangaylist = function() {
            return $http.get('/api/brangay/list');
        };
        clusterFactory.sitiolist = function(data) {
            var d = { "data": data };
            return $http.post("/api/sitio/list", d);
        };
        clusterFactory.brngycount = function() {
            return $http.get('api/brangay/record/count');
        };
        clusterFactory.brngycluster = function(data) {
            var d = {
                brngy: data
            };
            return $http.post("/api/barangy/cluster/record", d);
        };
        clusterFactory.familylist = function(data) {
            return $http.post("/api/barangy/fmleader/record", data);
        };
        clusterFactory.previewbco = function(id) {
            return $http.get("/api/bco/" + id + "/preview");
        };
        clusterFactory.previewtaskforce = function(id) {
            return $http.get("/api/cluster/" + id + "/preview");
        };
        return clusterFactory;
    });