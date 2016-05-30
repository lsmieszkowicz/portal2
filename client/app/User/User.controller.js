'use strict';

angular.module('portalApp')
  .controller('UserCtrl', function ($scope, $modal) {
    
    $scope.editUser = function(){
    	$modal.open({
    		templateUrl: 'app/User/EditUserModal/EditUserModal.html',
    		controller: 'EditUserModalCtrl',
    		scope: $scope
    	});
    };

    $scope.showUser = function(user){
    	console.log(user);
    	$scope.showingUser = user;
    	$modal.open({
    		templateUrl: 'app/User/ShowUser/ShowUser.html',
    		controller: 'ShowUserCtrl',
    		scope: $scope
    	});
    }


  });
