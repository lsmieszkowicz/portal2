'use strict';

angular.module('portalApp')
  .controller('TopCtrl', function ($scope, $localStorage) {
    
    if($localStorage.user)
    	$scope.activeUser = $localStorage.user;
	else
		$scope.activeUser = {};	

	$scope.token = $localStorage.token;

	$scope.activeUser.profilePhoto = 'assets/images/user-placeholder.png';
  });
