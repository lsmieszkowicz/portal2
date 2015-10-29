'use strict';

angular.module('portalApp')
  .controller('AddInvestmentModalCtrl', function ($scope, $modalInstance, Investment, $location) {
		
	$scope.add = function(){
		console.log('New investment data: ' + $scope.newInvestment + 'activeUser id: ' + $scope.$parent.activeUser.id);
		var investmentToCreate = {
			name:         $scope.newInvestment.name,
			description:  $scope.newInvestment.description,
			city:         1,
			admin: 		  $scope.$parent.activeUser.id,
			creationDate: new Date()
		}

		Investment.create(investmentToCreate)
        .then(function(result){
        	console.log(result);
            console.log('inwestycja utworzona');
            $modalInstance.close();
            $location.path('/investment/show/' + result.data.insertId);
         });
	};

	$scope.cancel = function(){
		$modalInstance.dismiss('canceled');
	};
		  
  });
