'use strict';

/* Services */
define(['angular', 'angularResource'], function (angular) {
	angular.module('photo-gallery.services', ['ngResource'])
		.factory('users', ['$resource', function ($resource) {
			return $resource('/users', {}, {
				get: {method: 'GET', isArray: true}
			});
		}])
		.factory('user-days', ['$resource', function ($resource) {
			return $resource('/user-days', {}, {
				get: {method: 'GET', isArray: true},
				save: {method: 'POST', isArray: false}
			});
		}])
});
