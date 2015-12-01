'use strict';

angular.module('portalApp')
  .controller('NavCtrl', function ($scope) {
    $scope.navOptions = [
    	{
    		title: 'Strona główna',
    		href: '/'
    	},

    	{
    		title: 'Miasta',
    		href: '/'
    	},

    	{
    		title: 'Inwestycje',
    		href: '/'
    	},

    	{
    		title: 'Inicjatywy',
    		href: '/'
    	},
    ]
  });
