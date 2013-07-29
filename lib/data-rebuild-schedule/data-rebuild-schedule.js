var schedule = require('node-schedule');
var mongo = require('../mongo');
var logger = require("../log").getLogger('data-rebuild-schedule');

var j = schedule.scheduleJob({hour: 23, minute: 50, dayOfWeek: 4}, function () {
	logger.debug("Beginning rebuild data...");

	mongo.remove('user-days', {}, function (err, r) {
		if (err) {
			logger.error("Clear data error: %s", err);
		} else {
			mongo.find('users', {}, {}, function (err, ur) {
				if (err) {
					logger.error("Rebuild data error: %s", err);
				} else {
					var newData = [];
					ur.forEach(function (user) {
						newData.push({ "name": user.name, "available": [], "cars": [], "version": 1});
					});

					mongo.save('user-days', newData, function (err, sr) {
						if (err) {
							logger.error("Saving new data error: %s", err);
						} else {
							logger.debug("Saved new data successfully.");
						}
					});
				}
			});
		}
	});
});
