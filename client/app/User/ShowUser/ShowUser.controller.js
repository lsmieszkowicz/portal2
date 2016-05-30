'use strict';

angular.module('portalApp')
  .controller('ShowUserCtrl', function ($scope, User) {
  		User.getProfilePhoto($scope.showingUser.id)
  		.then(function(result){
  			if(result.status === 'ok'){
  				if(typeof result.data === 'undefined')
  					$scope.showingUser.profilePhoto = {path: 'assets/images/user-placeholder.png'};
  				else
  					$scope.showingUser.profilePhoto = result.data;
  			}
  		})
  });
