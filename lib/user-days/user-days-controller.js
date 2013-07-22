var UserDaysController = module.exports = {};

var mongo = require('../mongo');

UserDaysController.getUserDays = function (req, res, next) {
	mongo.find('user-days', {}, {}, function (err, r) {
		res.send(r);
	});
}

UserDaysController.saveUserDays = function (req, res, next) {
	var userDays = req.param("userDays");
	delete(userDays._id);
	mongo.update('user-days', {"name": userDays.name}, req.param("userDays"), function (err, r) {
		if (!err) {
			res.send({"result": "SUCCESS", "data": "", "msg": "恭喜恭喜，保存成功."});
		} else {
			console.log(err);
			res.send({"result": "FAIL", "data": "", "msg": "保存失败，刷一下页面试试?"});
		}
	});
};
