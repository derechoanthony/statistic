angular.module('userControllers', ['userServices'])
    .controller('regCtrl', function ($http, $location, $timeout, User){
    var app = this;
    this.regUser = function(regData){
        app.errorMsg = false;
        app.loading = true;
        User.create(app.regData).then(function(params) {
            if(params.data.success){
                app.loading = false;
                app.successMsg = params.data.msg+'... Redirecting.';
                $timeout(function(){
                    $location.path('/');
                }, 2000);
            }else{
                app.loading = false;
                app.errorMsg = params.data.msg;
            }
        });
    };
});