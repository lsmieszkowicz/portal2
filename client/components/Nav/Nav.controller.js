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
    		href: '/city/list'
    	},

    	{
    		title: 'Inwestycje',
    		href: '/investment/list'
    	},

    	{
    		title: 'Moja okolica',
    		href: '/neighbourhood'
    	},
    ]
  });
