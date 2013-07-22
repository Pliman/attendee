'use strict';

/* Controllers */
define(['jQuery', 'angular', 'popMsger', 'dialog', 'angularUiRouter', './services'], function ($, angular, popMsger, dialog) {
	return angular.module('attendee.controllers', ['attendee.services'])
		.controller('users', ['$scope', '$state', 'users', '$rootScope', "session", function ($scope, $state, users, $rootScope, session) {
			users.get(function (users) {
				$scope.users = users;
			});

			$scope.loginWithUser = function (userName, nickName) {
				var user = { "name": userName, "nickName": nickName};

				session.save({"user": user}, function (rtn) {
					if (rtn.result === "SUCCESS") {
						$rootScope.currentUser = user;
						$state.transitionTo('vote');
					}
				});
			};
		}])
		.controller('vote', ['$rootScope', '$scope', '$state', '$stateParams', 'weekdays', "weekdaysStatistic", 'userDays', "session",
			function ($rootScope, $scope, $state, $stateParams, weekdays, weekdaysStatistic, userDays, session) {
				var loadUserPlan = function () {
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
									$scope.currentUserAttend[available] = available;
								}
							});

							userDay.cars.forEach(function (car) {
								weekdaysStatistic[car.day].cars.push($.extend({}, car, {"driver": userDay.name}, true));

								if (userDay.name === currentUserName) {
									$scope.currentUserCar[car.day] = car;
								}
							});
						});
					});

					$scope.gotCar = function (weekday) {
						console.log(weekday);
					};

					$scope.checkGo = function (weekday) {
						// 1. 是否选中
						// 2. 是否开车
						// 3. 车里面是否有乘客
						var go = $('#' + weekday + 'Go')[0].checked;
						var drive = !!$scope.currentUserCar[weekday];
						var havePassenger = $scope.currentUserCar[weekday] && $scope.currentUserCar[weekday].passengers.length;

						if (go) {
							console.log("人员" + currentUserName);
						} else {
							if (drive) {
								if (drive && havePassenger) {
									new dialog({
										title: 'example',
										width: 250,
										bodyHTML: $scope.currentUserCar[weekday].passengers.join(","),
										cancelText: 'cancel',
										cancelCb: function () {
										},
										okText: 'ok',
										okCb: function () {
										}
									});

									//console.log("Confirm Cancel drive");
								}

								console.log("Cancel drive");
							}
						}
					};
				};

				if (!$rootScope.currentUser) {
					session.get(function (rtn) {
						if (rtn.result === "SUCCESS") {
							$rootScope.currentUser = rtn.data;

							loadUserPlan();
						} else {
							window.location.href = "/";
						}
					});
				} else {
					loadUserPlan();
				}
			}])
});
