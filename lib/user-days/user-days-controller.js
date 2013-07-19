var UserDaysController = module.exports = {};

var mongo = require('../mongo');

UserDaysController.getUserDays = function (req, res, next) {
	mongo.find('user-days', {}, {}, function (err, r) {
		res.send(r);
	});
}

UserDaysController.saveUserDays = function () {
	mongo.save('user-days', req.param("userDays"), {}, function (err, r) {
		res.send(r);
	});
};
