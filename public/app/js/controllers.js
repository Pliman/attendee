'use strict';

/* Controllers */
define(['jQuery', 'angular', 'popMsger', 'angularUiRouter', './services'], function ($, angular, popMsger) {
	return angular.module('attendee.controllers', ['attendee.services'])
		.controller('users', ['$scope', '$state', 'users', '$rootScope', function ($scope, $state, users, $rootScope) {
			users.get(function (users) {
				$scope.users = users;
			});

			$scope.loginWithUser = function (userName, nickName) {
				$rootScope.currentUser = { "name": userName, "nickName": nickName};
				$state.transitionTo('vote');
			};
		}])
		.controller('vote', ['$rootScope', '$scope', '$state', '$stateParams', 'weekdays', "weekdaysStatistic", 'userDays',
			function ($rootScope, $scope, $state, $stateParams, weekdays, weekdaysStatistic, userDays) {
				var currentUserName = $rootScope.currentUser.name
				$scope.nickName = $rootScope.currentUser.nickName;
				$scope.currentUserAttend = {};
				$scope.currentUserCar = {};

				$scope.weekdays = weekdays;
				$scope.weekdaysStatistic = $.extend({}, weekdaysStatistic, true);

				userDays.get(function (userDays) {
					if (!userDays) {
						return;
					}
					$scope.userDays = userDays;

					userDays.forEach(function (userDay) {
						userDay.available.forEach(function (available) {
							weekdaysStatistic[available].attendees.push(currentUserName);

							if (userDay.name === currentUserName) {
								$scope.currentUserAttend[available] = true;
							}
						});

						userDay.cars.forEach(function (car) {
							weekdaysStatistic[car.day].cars.push($.extend({}, car, {"driver": userDay.name}, true));

							if (userDay.name === currentUserName) {
								$scope.currentUserCar[car.day] = true;
							}
						});
					});
				});

				$scope.gotCar = function (weekday) {
					console.log(weekday);
				};
			}])
});
