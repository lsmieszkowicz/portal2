'use strict';

angular.module('portalApp')
  .controller('AuthCtrl', function ($rootScope, $scope, $location, $localStorage, Auth) {
    
    $scope.login = function() {
		var userData = {
			login: 	  $scope.loginForm.login,
			password: $scope.loginForm.password
		}

		AuthService.login(userData, function(res) {
			if(res.type == false) {
				// WYSWIETLENIE BLEDU                             <----------- TODO
			}
			else {
				$localStorage.user   = res.data.user; 
				$localStorage.token  = res.data.token;
				$scope.$apply();
			}
		}, 
		function(){
			$rootScope.error = 'Nie udalo sie zalogowac.';
		});
	};

	$scope.register = function(){
		var userData = {
			login: 	  $scope.registerForm.login,
			name: 	  $scope.registerForm.name,
			surname:  $scope.registerForm.surname,
			email:    $scope.registerForm.email,
			password: $scope.registerForm.password
		}

		AuthService.register(userData, function(res){
			if(res.type == false) {
				// WYSWIETLENIE BLEDU                             <----------- TODO	
			}
			else {
				$localStorage.user   = res.data.user; 
				$localStorage.token  = res.data.token;
			}
		},
		function(){
			$rootScope.error = 'Nie udało się zarejestrować.'
		});
	};

	$scope.logout = function() {
		AuthService.logout(function(){
			window.location = "/";
		}, 
		function(){
			alert('Nie udalo sie wylogowac.')
		});
	};

	$scope.activeUser = $localStorage.user;
	$scope.token      = $localStorage.token;

  });
