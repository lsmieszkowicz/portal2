'use strict';

angular.module('portalApp')
  .controller('TopCtrl', function ($scope, $localStorage) {
    
    $scope.activeUser = $localStorage.user;
	$scope.token      = $localStorage.token;
 
  });
