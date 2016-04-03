'use strict';

angular.module('portalApp')
  .controller('EditInvestmentModalCtrl', function ($scope, $modalInstance, Investment, Update) {
  		
  		$scope.editedData = angular.copy($scope.investment);

  		$scope.edit = function() {
  			$scope.$parent.investment = angular.copy($scope.editedData);
  			var id = $scope.$parent.investment.id;
  			
  			Investment.update(id, $scope.editedData)
  			.then(function(result){
  				if(result.status === 'ok')
  					
            var update = {
              investment_id: $scope.investment.id,
              updater_id: $scope.activeUser.id,
              timestamp: new Date(),
              couse: 'Investment info changed',
              item_id: $scope.investment.id,
              item_type: 'investment_data'
            };

            Update.createInvestmentUpdate(update);
            $modalInstance.close();
  			});
  		};

  		$scope.cancel = function() {
			$modalInstance.dismiss();
		};
  });
