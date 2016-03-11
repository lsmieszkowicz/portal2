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


  });
