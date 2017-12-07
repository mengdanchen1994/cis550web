/// <reference path="C:\Leedhar\Works\TableSure\TableSure\TableSure.Web\Scripts/angular.js" />

'use strict';
var loginApp = angular.module('loginApp', ['LocalStorageModule']);

loginApp.controller('loginController', ['$scope', 'localStorageService', 'loginAppFactory', function ($scope, localStorageService, loginAppFactory) {

    $scope.authenticateExternalProvider = function (provider) {

        var externalProviderUrl = "/api/Account/ExternalLogin?provider=" + provider + "&response_type=token&client_id=self&redirect_uri=http%3A%2F%2Flocalhost%3A60614%2FWeb%2Fhtml%2Flogin.html&state=JKo2RSqusrQYSXVvIMNm_n1It4jesvKrXN2zO62cH2g1";
        window.location.href = externalProviderUrl;

    };

        $scope.CheckLocationHash = function () {
        if (location.hash) {

            if (location.hash.split('access_token=')) {
                $scope.accessToken = location.hash.split('access_token=')[1].split('&')[0];
                if ($scope.accessToken) {
                    loginAppFactory.CheckRegistration($scope.accessToken).then(function (response) {
                        if (response.data.HasRegistered) {
                            localStorageService.set('authorizationData', { token: $scope.accessToken, userName: response.userName });
                        }
                        else {
                            loginAppFactory.SignupExternal($scope.accessToken).then(function (response) {
                                localStorageService.set('authorizationData', { token: $scope.accessToken, userName: response.userName });
                            }, function (err) {
                                alert(err.data.Message);
                            })
                        }
                    }, function () {
                        alert("failed.");
                    })
                }
            }
        }
        }

        $scope.CheckLocationHash();

}]);

loginApp.factory('loginAppFactory', function (localStorageService, $q, $http) {

    var fac = {};

    fac.CheckRegistration = function (token) {

        var deferred = $q.defer();

        var request = {
            method: 'get',
            url: '/api/Account/UserInfo',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }

        fac.SignupExternal = function (token) {

            var request = {
                method: 'post',
                url: '/api/Account/RegisterExternal',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                data: {}
            }

            return $http(request)
        }

        return $http(request)
    }

    return fac;

})