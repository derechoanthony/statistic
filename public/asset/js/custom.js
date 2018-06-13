function addfld() {
    var next = 0;

    var addto = '#field' + next;
    var addRemove = '#field' + next;
    next = next + 1;
    var fld = '<div class="col-sm-12" id="field' + next + '">\
                <div class="col-sm-3">\
                    <div class="form-group">\
                        <label for="inputtaskforce">Last Name</label>\
                        <input type="text" ng-model="cluster.m_lname0" id="inputtaskforce" autocomplete="off" required class="form-control" placeholder="Enter BARANGAY">\
                    </div>\
                </div>\
                <div class="col-sm-3">\
                    <div class="form-group">\
                        <label for="inputtaskforce">First Name</label>\
                        <input type="text" id="inputtaskforce" ng-model="cluster.m_fname0" autocomplete="off" required class="form-control" placeholder="Enter BARANGAY">\
                    </div>\
                </div>\
                <div class="col-sm-3">\
                    <div class="form-group">\
                        <label for="inputmname">Middle Name</label>\
                        <input type="text" id="inputmname" ng-model="cluster.m_mname0" autocomplete="off" value="" required class="form-control" placeholder="Enter BARANGAY">\
                    </div>\
                </div>\
                <div class="col-sm-3">\
                    <div class="form-group">\
                        <button type="button" class="btn btn-danger removebtn"><img src="asset/image/btnicon/recycling-bin.png"> Remove</button></div></div></div>';
    var newInput = $(fld);
    var n_cnt = Number(next) + 1;
    $("#cnt").val(next);
    $(addto).after(newInput);
}
/* 
    the variable "i" is for the count to identify which specific field to be remove.
*/
function Remove(i) {
    console.log(i)
}