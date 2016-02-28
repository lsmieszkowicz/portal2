'use strict';

angular.module('portalApp')
  .controller('EditInvestmentModalCtrl', function ($scope, $modalInstance, Investment) {
  		
  		$scope.editedData = angular.copy($scope.investment);

  		$scope.edit = function() {
  			$scope.$parent.investment = angular.copy($scope.editedData);
  			var id = $scope.$parent.investment.id;
  			
  			Investment.update(id, $scope.editedData)
  			.then(function(result){
  				if(result.status === 'ok')
  					$modalInstance.close();
  			});
  		};

  		$scope.cancel = function() {
			$modalInstance.dismiss();
		};
  });
