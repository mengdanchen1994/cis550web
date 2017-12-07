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
	    $scope.initMap = function (latitude, lon) {
	  console.log("Latitude: " + latitude);
	  console.log("Longitude: " + lon);
      if(latitude==undefined && lon==undefined) {
        alert("Unable to Get the Location in detail!")
      }
	  if(latitude==undefined){
		  latitude = 40.7589;
	  }
	  if(lon==undefined){
		  lon = -73.9851;
	  } 

        var uluru = {lat: parseFloat(latitude), lng: parseFloat(lon)};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 18,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      };
});


app.controller('myFoodController', function($scope, $http) {
        $scope.message="";
		console.log('ddd')
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

app.controller('myFoodnnController', function($scope, $http, $location) {
       // $scope.message="";
       // console.log($location.absUrl());
       // var url = $location.absUrl();
       // var start = url.lastIndexOf("/")+1;
       // var end = url.length;
       // console.log($location.absUrl().substring(start, end));
       // var foodnewname = $location.absUrl().substring(start,end);
       var foodnewname=sessionStorage.getItem("sent");
       $scope.Submit = function() {
        var request = $http.get('/datafoodname/'+foodnewname);
            request.success(function(data) {
            $scope.data = data;
            if(data.length==0) {
                alert("No Inspection Result!")
                window.close();
            }
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

app.controller('myhoteltwoController', function($scope, $http, $location) {
       // $scope.message="";
       // console.log($location.absUrl());
       // var url = $location.absUrl();
       // var start = url.lastIndexOf("/")+1;
       // var end = url.length;
       // console.log($location.absUrl().substring(start, end));
       // var foodnewname = $location.absUrl().substring(start,end);
       var hotelnewname=sessionStorage.getItem("senthotel");
       $scope.Submit = function() {
        var request = $http.get('/datahotelname/'+hotelnewname);
            request.success(function(data) {
            $scope.data = data;
            if(data.length==0) {
                alert("No Restuarant nearby")
                window.close();
            }
        });
        request.error(function(data){
            console.log('err');
        });
       };
});

app.controller('myhotelthreeController', function($scope, $http, $location) {
       var hotelnewname=sessionStorage.getItem("senthotelthree");
       $scope.Submit = function() {
        var request = $http.get('/datahotelthreename/'+hotelnewname);
            request.success(function(data) {
            $scope.data = data;
            if(data.length==0) {
                alert("No Entertainment nearby")
                window.close();
            }
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

// var myApp = angular.module("myApp",[]);
// myApp.controller('myFBController', ['$scope', function($scope){
//     $scope.gmail = (
//         username: "",
//         email:"")};
//     $scope.onGoogleLogin = function() {
//         var params = {
//             console.log("yes1")
//             'clientid':'717118915664-aanv31i55anmls8djfruaao10pe398ae.apps.googleusercontent.com',
//             'cookiepolicy':'single_host_origin',
//             'callback':function(result) {
//                 if(result['status']['sign_in']) {
//                     var request = gapi.client.plus.people.get({
//                         'userId':'me'
//                     }
//                     );
//                     request.execute(function(resp) {
//                         $scope.$apply(function() {
//                             $scope.gmail.username = resp.displayName;
//                             $scope.gmail.email = resp.email[0].value;
//                             $scope.g_image= resp.image.url;
//                         });
//                     });
//                 }
//             },
//             'approvalprompt':'force',
//             'scope':'https://www.googleapis.com/auth/plus.login https://www.googleapis.com//auth/plus.profile.emails.read'

//         };
//         gapi.auth.signIn(params);
//     }

//     $scope.facebook = {
//         username:"",
//         email:""
//     };

//     $scope.onFBLogin = function() {
//         FB.login(function(response){
//             if(response.authResponse) {
//                 FB.api('/me','GET',{fields:'email, first_name, name, id, picture'}, function(response) {
//                     $scope.$apply(function() {
//                             $scope.facebook.username = response.name;
//                             $scope.facebook.email = response.email;
//                             $scope.fb_image=response.picture.data.url;
//                     });
//                 });
//             } else {

//             }
//         }, {
//             scope;'email, user_likes',
//             return_scopes:true
//         });
//     }
// }]);


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