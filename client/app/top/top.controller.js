'use strict';

angular.module('portalApp')
  .controller('TopCtrl', function ($scope, $localStorage) {
    
    if($localStorage.user)
    	$scope.activeUser = $localStorage.user;
	else
		$scope.activeUser = {};	

	$scope.token = $localStorage.token;
	if(!$scope.activeUser.profilePhoto){
		$scope.activeUser.profilePhoto = 'assets/images/user-placeholder.png';
	}
	
  });
