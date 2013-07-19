'use strict';

/* Controllers */
define(['jQuery', 'angular', 'popMsger', 'angularUiRouter', './services'], function ($, angular, popMsger) {
	return angular.module('photo-gallery.controllers', ['photo-gallery.services'])
		.controller('users', ['$scope', '$state', 'users', function ($scope, $state, users) {
			users.get(function (users) {
				$scope.users = users;
			});

			$scope.loginWithUser = function (userName) {
				$state.transitionTo('vote', {userName: userName});
			};
		}])
		.controller('vote', ['$scope', '$state', '$stateParams', 'users', function ($scope, $state, $stateParams, users) {
			console.log($stateParams.userName);
			$scope.userName = $stateParams.userName;
		}])
});
