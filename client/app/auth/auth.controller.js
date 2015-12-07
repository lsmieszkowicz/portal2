'use strict';

angular.module('portalApp')
  .controller('AuthCtrl', function ($scope, $rootScope, $location, $localStorage, Auth) {
    
    $scope.login = function(){
	  	var loginData = {
	  		login:    $scope.loginForm.login,
	  		password: $scope.loginForm.password
	  	};

	  	Auth.login(loginData, 
	  		function(res){
	  			if(res.status == 'nouser'){
	  				$rootScope.error = 'Uzytkownik o podanym loginie nie istnieje';
	  			}
	  			else if(res.status == 'error'){
	  				$rootScope.error = 'Niepoprawne dane logowania';
	  			}
	  			else{
	  				$localStorage.user   = res.data.user; 
					$localStorage.token  = res.data.token;
					// $scope.$apply();
	  			}
	  		},
	  		function(error){
	  			$rootScope.error = 'Nie udalo sie zalogowac';
	  		}
	  	);
    };

    $scope.register = function(){
    	
    	var userData = {
    		login: 	  $scope.registerForm.login,
			name: 	  $scope.registerForm.name,
			surname:  $scope.registerForm.surname,
			email:    $scope.registerForm.email,
			password: $scope.registerForm.password
    	};

    	Auth.register(userData,
    		
    		function(res){
    			Auth.register(userData, function(res){
    				if(res.status == 'error'){
    					$rootScope.error = 'Nie udalo sie zalogowac';
    				}
    				else{
    					$localStorage.user   = res.data.user; 
						$localStorage.token  = res.data.token;
    				}
    			});
    		},

    		function(error){
    			$rootScope.error = 'Nie udalo sie zalogowac';
    		}
    	);
    };

    $scope.logout = function(){
    	Auth.logout(
    		function(){
    			window.location = "/";
    		},
    		function(){
    			$rootScope.error = 'Nie udalo sie zalogowac';
    		}
    	);
    };

  });
