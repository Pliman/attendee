'use strict';

/* Controllers */
define(['jQuery', 'angular', 'popMsger', 'angularUiRouter', './services'], function ($, angular, popMsger) {
	return angular.module('attendee.controllers', ['attendee.services'])
		.controller('users', ['$scope', '$state', 'users', function ($scope, $state, users) {
			users.get(function (users) {
				$scope.users = users;
			});

			$scope.loginWithUser = function (userName) {
				$state.transitionTo('vote', {userName: userName});
			};
		}])
		.controller('vote', ['$scope', '$state', '$stateParams', 'weekdays', function ($scope, $state, $stateParams, weekdays) {
			$scope.userName = $stateParams.userName;

			$scope.weekdays = weekdays;

			$scope.gotCar = function (weekday) {
				console.log(weekday);
			};
		}])
});
