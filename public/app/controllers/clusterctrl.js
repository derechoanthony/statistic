angular.module('clusterControllers', ['clusterServices', 'votersServices', 'authServices', 'userServices'])
    .controller('clusterCtrl', function($http, $location, $timeout, $scope, cluster, voters, Auth, User) {
        var app = this;
        $scope.flnotfound = true;
        $scope.clnotfound = true;
        $scope.searchpannel = false;
        $scope.d = new Date();
        $scope.brngylist = [];
        $scope.sitiolist = [];
        $scope.bcolist = [];
        $scope.vtrs = [];
        $scope.vtrslist = [];

        $scope.searchvoters = function() {
            $scope.searchpannel = true;
            voters.getallvoters().then(function(r) {
                var z = [];
                for (var i = 0; i < r.data.msg.length; i++) {
                    $scope.voters = r.data.msg[i].brngydata;
                    for (var j = 0; j < $scope.voters.length; j++) {
                        $scope.vtrslist.push($scope.voters[j]);
                    }
                }
            });
        }

        $scope.taskforcelist = [];
        cluster.barangaylist().then(function(res) {
            $scope.brngylist = res.data;
        });
        User.userlist().then(function(res) {
            // 
            for (var i = 0; i < res.data.length; i++) {
                if ((res.data[i].usrtype == "bco") && (res.data[i].status == "active")) {
                    $scope.bcolist.push(res.data[i]);
                }

                if ((res.data[i].usrtype == "taskforce") && (res.data[i].status == "active")) {
                    $scope.taskforcelist.push(res.data[i]);
                }

            }

        });
        $scope.sitiofunc = function() {
            if (($scope.brngy != "") || ($scope.brngy != null)) {
                cluster.sitiolist($scope.brngy).then(function(res) {
                    $scope.sitiolist = res.data;
                });
            } else {
                $scope.sitiolist = [];
            }
        };
        $scope.datestring = $scope.d.getDate() + "-" + ($scope.d.getMonth() + 1) + "-" + $scope.d.getFullYear() + " " + $scope.d.getHours() + ":" + $scope.d.getMinutes();
        for (var i = 0; i < 200; i++) {
            var m = 'member_' + i + '';
            $scope[m] = true;
        }


        $scope.varcont = 0;
        /* 
            create cluster data
        */

        $scope.columns = [{
            colId: 'col1',
            fname: '',
            mname: ''
        }];

        this.create = function(regData) {
            console.log(app.regData);
        };
        $scope.validateentry = function() {
            var brngy = $scope.brngy;
            var sitio = $scope.sitio;
            var bco = $scope.bco;
            var taskforce = $scope.taskforce;
            var cllname = $scope.cllname.toUpperCase();
            var clfname = $scope.clfname.toUpperCase();
            var clmname = $scope.clmname.toUpperCase();
            var fllname = $scope.fllname.toUpperCase();
            var flfname = $scope.flfname.toUpperCase();
            var flmname = $scope.flmname.toUpperCase();
            var clLeader = 0;
            var fLeader = 0;
            var memberData;
            var membercntnr = [];
            var memContainer = [];
            voters.getallvoters().then(function(r) {
                var brgyCont = r.data.msg;
                for (var i = 0; i < brgyCont.length; i++) {
                    var brgyData = brgyCont[i].brngydata;
                    // $scope.vtrs.push(brgyData);
                    for (var j = 0; j < brgyData.length; j++) {
                        if ((String(cllname) === String(brgyData[j].lname)) &&
                            (String(clfname) === String(brgyData[j].fname)) &&
                            (String(clmname) === String(brgyData[j].mname))) {
                            clLeader = clLeader + 1;
                        }
                        if ((String(fllname) === String(brgyData[j].lname)) &&
                            (String(flfname) === String(brgyData[j].fname)) &&
                            (String(flmname) === String(brgyData[j].mname))) {
                            fLeader = fLeader + 1;
                        }
                    }
                }
                for (var k = 0; k < $scope.columns.length; k++) {
                    var member = 'member_' + k + '';
                    for (var x = 0; x < brgyCont.length; x++) {
                        var brngcnt = brgyCont[x].brngydata;
                        for (var z = 0; z < brngcnt.length; z++) {
                            if ((String(brngcnt[z].lname) === String($scope.columns[k].lname.toUpperCase())) &&
                                (String(brngcnt[z].fname) === String($scope.columns[k].fname.toUpperCase())) &&
                                (String(brngcnt[z].mname) === String($scope.columns[k].mname.toUpperCase()))) {
                                memContainer.push(k);
                                memberData = {
                                    lname: String($scope.columns[k].lname.toUpperCase()),
                                    fname: String($scope.columns[k].fname.toUpperCase()),
                                    mname: String($scope.columns[k].mname.toUpperCase())
                                };
                                membercntnr.push(memberData);
                            }
                        }
                    }
                }
                for (var c = 0; c < $scope.columns.length; c++) {
                    var m = 'member_' + c + '';
                    var x_array = $scope.isInArray(c, memContainer);
                    if (x_array == true) {
                        $scope[m] = true;
                    } else {
                        $scope[m] = false;
                    }
                }
                if (clLeader == 0) {
                    $scope.clnotfound = false;
                } else {
                    $scope.clnotfound = true;
                }
                if (fLeader == 0) {
                    $scope.flnotfound = false;
                } else {
                    $scope.flnotfound = true;
                }
                if (($scope.columns.length === memContainer.length) && (clLeader != 0) && (fLeader != 0)) {
                    Auth.getUser().then(function(data) {
                        var json = {
                            brngy: brngy,
                            sitio: sitio,
                            bco: bco,
                            taskforce: taskforce,
                            clusterleader: [{
                                cllname: cllname,
                                clfname: clfname,
                                clmname: clmname
                            }],
                            familyleader: [{
                                fllname: fllname,
                                flfname: flfname,
                                flmname: flmname
                            }],
                            famlymember: membercntnr,
                            entrydate: $scope.datestring,
                            uid: data.data.id
                        };
                        cluster.create(json).then(function(params) {
                            console.log(params);
                        });
                    });
                }
            });

        };
        // console.log($scope.vtrs);
        $scope.isInArray = function(value, array) {
            return array.indexOf(value) > -1;
        };
        $scope.addNewColumn = function() {
            var newItemNo = $scope.columns.length + 1;
            $scope.varcont = newItemNo;
            $scope.columns.push({
                'colId': 'col' + newItemNo
            });
            // console.log($scope.varcont);


        };
        // $scope.checkVoters = function()

        $scope.removeColumn = function(index) {
            // remove the row specified in index
            $scope.columns.splice(index, 1);
            // if no rows left in the array create a blank array
            if ($scope.columns.length() === 0 || $scope.columns.length() == null) {
                alert('no rec');
                $scope.columns.push = [{
                    "colId": "col1"
                }];
            }
        };
    });