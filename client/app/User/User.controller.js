'use strict';

angular.module('portalApp')
  .controller('UserCtrl', function ($scope, $modal, $localStorage, User) {
    
  	$scope.userRankButtons = {};

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

	$scope.incrementRank = function(){
		if($scope.showingUser.id === $scope.activeUser.id){
			alert("Nie możesz ocenić sam siebie");
		}
		else{
			User.updateRank($scope.showingUser.id, {rank: 1})
			.then(function(){
				$scope.showingUser.rank++;
				
				// anulowanie negatywnego glosu
				if($scope.userRankButtons.minusLocked === true){
					$scope.userRankButtons.plusLocked = false;
					$scope.userRankButtons.minusLocked = false;
				}
				// glos negatywny
				else{
					$scope.userRankButtons.plusLocked = true;
					$scope.userRankButtons.minusLocked = false;
				}
				
				$localStorage.userRankButtons[$scope.showingUser.id] = $scope.userRankButtons;
			});
		}

	};

	$scope.decrementRank = function(){
		if($scope.showingUser.id === $scope.activeUser.id){
			alert("Nie możesz ocenić sam siebie");
		}
		else{
			User.updateRank($scope.showingUser.id, {rank: -1})
			.then(function(){
				$scope.showingUser.rank--;

				// anulowanie pozytywnego glosu
				if($scope.userRankButtons.plusLocked === true){
					$scope.userRankButtons.plusLocked = false;
					$scope.userRankButtons.minusLocked = false;
				}
				// glos negatywny
				else {
					$scope.userRankButtons.plusLocked = false;
					$scope.userRankButtons.minusLocked = true;
				}

				$localStorage.userRankButtons[$scope.showingUser.id] = $scope.userRankButtons;
			});			
		}

	};

	var initRankButtons = function(){
		if(typeof $scope.showingUser !== 'undefined'){
			console.log($scope.showingUser);
			if(typeof $localStorage.userRankButtons !== 'undefined'){

				if(typeof $localStorage.userRankButtons[$scope.showingUser.id] !== 'undefined'){
					$scope.userRankButtons = $localStorage.userRankButtons[$scope.showingUser.id];
				}
			} 
			else {
				$localStorage.userRankButtons = {};
				$scope.userRankButtons = {
					plusLocked: false,
					minusLocked: false
				}
			}
		}
			
	};

	initRankButtons();

  });
