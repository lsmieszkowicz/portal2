'use strict';

angular.module('portalApp')
  .controller('AuthCtrl', function ($scope, $rootScope, $location, $localStorage, Auth, User) {
    
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
	  				$localStorage.user = res.data.user; 
					$localStorage.token = res.data.token;
                    $scope.$parent.$parent.activeUser = res.data.user; 
                    $scope.$parent.$parent.token = res.data.token;

                    getProfilePhoto();
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
        if($scope.registerForm.password === $scope.registerForm.password_repeated){

            Auth.register(userData,
                
                function(res){
                    Auth.register(userData, function(res){

                        if(res.status == 'error'){
                            $rootScope.error = 'Nie udalo sie zarejestrować';
                        }
                        else{
                            // po udanym zarejestrowaniu dokonuje sie automatyczne logowanie
                            var loginData = {
                                login:    $scope.registerForm.login,
                                password: $scope.registerForm.password
                            };

                            Auth.login(loginData, function(response){
                                $localStorage.user = response.data.user; 
                                $localStorage.token = response.data.token;
                                $scope.$parent.$parent.activeUser = response.data.user; 
                                $scope.$parent.$parent.token = response.data.token;

                                getProfilePhoto();
                            });
                        }
                    });
                },

                function(error){
                    $rootScope.error = 'Nie udało się zarejestrować';
                }
            );
        }
        else{
            alert('Hasła są niezgodne');
        }

    };

    $scope.logout = function(){
    	Auth.logout(
    		function(){
    			$scope.activeUser = null;
                window.location = "/";
    		},
    		function(){
    			$rootScope.error = 'Nie udalo sie zalogowac';
    		}
    	);
    };

    var getProfilePhoto = function(){
        User.getProfilePhoto($scope.activeUser.id)
        .then(function(response){
            if(response.status === 'ok' && response.data){
                console.log(response.data);
                $scope.activeUser.profilePhoto = response.data.path;
            }
            else {
                $scope.activeUser.profilePhoto = 'assets/images/user-placeholder.png';
            }
        });
    };

  });
