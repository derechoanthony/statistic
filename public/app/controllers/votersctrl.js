angular.module('votersControllers', ['votersServices', 'authServices'])
    .controller('votersCtrl', function($http, $location, $timeout, voters, $scope, readFileData, Auth) {
        var app = this;
        $scope.fileDataObj = [];
        $scope.brngy = "";
        $scope.vdata = {};
        $scope.tbdata = [];
        $scope.updbtn = true;
        $scope.d = new Date();
        $scope.datestring = $scope.d.getDate() + "-" + ($scope.d.getMonth() + 1) + "-" + $scope.d.getFullYear() + " " + $scope.d.getHours() + ":" + $scope.d.getMinutes();
        $scope.uploadFile = function() {
            if ($scope.fileContent) {
                $scope.fileDataObj = readFileData.processData($scope.fileContent);
                $scope.updbtn = false;
                $scope.tbdata = $scope.fileDataObj.data;
                $scope.brngy = $scope.fileDataObj.data[0].Barangay;
                Auth.getUser().then(function(data) {
                    $scope.databucket = {
                        Barangay: $scope.brngy,
                        brngydata: $scope.tbdata,
                        entrydate: $scope.datestring,
                        uid: data.data.id
                    };
                    voters.create($scope.databucket).then(function(params) {
                        console.log(params);
                    });
                });




            }
        };

    })
    .directive('fileReaderDirective', function() {
        return {
            restrict: "A",
            scope: {
                fileReaderDirective: "=",
            },
            link: function(scope, element) {
                $(element).on('change', function(changeEvent) {
                    var files = changeEvent.target.files;
                    if (files.length) {
                        var r = new FileReader();
                        r.onload = function(e) {
                            var contents = e.target.result;
                            scope.$apply(function() {
                                scope.fileReaderDirective = contents;
                            });
                        };
                        r.readAsText(files[0]);
                    }
                });
            }
        };
    }).factory('readFileData', function() {
        return {
            processData: function(csv_data) {
                var record = csv_data.split(/\r\n|\n/);
                var headers = record[0].split(',');
                var lines = [];
                var c = [];
                var json = {};
                var jd;
                for (var i = 1; i < record.length; i++) {
                    var data = record[i].split(',');
                    if (data.length == headers.length) {
                        var tarr = [];
                        for (var j = 0; j < headers.length; j++) {
                            tarr.push(data[j]);
                        }
                        lines.push(tarr);
                    }
                }
                for (var k = 0; k < lines.length; ++k) {
                    // console.log(lines[][k]);
                    console.log('lines-->>', lines[k][1]);
                    jd = {
                        lname: lines[k][1],
                        fname: lines[k][2],
                        mname: lines[k][3],
                        prno: lines[k][4],
                        vadd: lines[k][5],
                        bday: lines[k][6],
                        Barangay: lines[k][7],
                        status: 0

                    }
                    c.push(jd);
                }

                json.data = c;
                return json;
            }
        };
    });