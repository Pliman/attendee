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
		.controller('vote', ['$scope', '$state', '$stateParams', 'users', 'menu', function ($scope, $state, $stateParams, AlbumPhotos, menu) {
			menu.changeMenu($stateParams.albumName);

			AlbumPhotos.get({albumName: $stateParams.albumName}, function (photos) {
				$scope.photos = photos;
			});

			$scope.navPhoto = function (photoName) {
				$state.transitionTo('albumPhoto', {photoName: photoName});
			};
		}])
});
