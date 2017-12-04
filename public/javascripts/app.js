var app = angular.module('angularjsNodejsTutorial',[]);
app.controller('myController', function($scope, $http) {
        $scope.message="";
        $scope.Submit = function() {
        var request = $http.get('/data/'+$scope.name);
        request.success(function(data) {
            $scope.data = data;
        });
        request.error(function(data){
            console.log('err');
        });
    
    }; 
});


app.controller('myFoodController', function($scope, $http) {
        $scope.message="";
        $scope.Find = function() {
        var request = $http.get('/datafood/'+$scope.streetname+'&'+$scope.cuisine);
        request.success(function(data) {
            $scope.data = data;
        });
        request.error(function(data){
            console.log('err');
        });
    
    }; 
});

app.controller('myHotelController', function($scope, $http) {
        $scope.message="";
        $scope.Submit = function() {
        var request = $http.get('/datahotel/'+$scope.streetname+'&'+$scope.preferance);
        request.success(function(data) {
            $scope.data = data;
        });
        request.error(function(data){
            console.log('err');
        });
    
    }; 
});

app.controller('myEntertainmentController', function($scope, $http) {
        $scope.message="";
        $scope.Submit = function() {
        var request = $http.get('/dataentertainment/'+$scope.streetname+'&'+$scope.type);
        request.success(function(data) {
            $scope.data = data;
        });
        request.error(function(data){
            console.log('err');
        });
    
    }; 
});

app.controller('mySignageController', function($scope, $http) {
        $scope.message="";
        $scope.Submit = function() {
        var request = $http.get('/datasignage/'+$scope.streetname+'&'+$scope.size);
        request.success(function(data) {
            $scope.data = data;
        });
        request.error(function(data){
            console.log('err');
        });
    
    }; 
});


app.controller('insertController', function($scope, $http) {
     $scope.Insert = function() {
        var request = $http.get('/insert/'+$scope.login+'&'+$scope.name+'&'+$scope.sex+'&'+$scope.RelationshipStatus+'&'+$scope.Birthyear);
        request.success(function(data) {
            $scope.message = "Insertion successful!";
        });
        request.error(function(data){
            console.log('err');
        });
    };
    
});