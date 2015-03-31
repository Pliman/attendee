module.exports = {
	"application": {
		"rebuildDataTime": {
			hour: 16,
			minute: 07,
			dayOfWeek: 2
		}
	},
	"logging": {
		"log4js": {
			"appenders": [
				{
					"type": "file",
					"filename": "app.log",
					"maxLogSize": 10000000,
					"backups": 10
				}
			]
		}
	},
	"mongoDB": {
		"host": "localhost",
		"port": "27017",
		"dbName": "attendee",
		"userName": "attendee",
		"password": "password",
		"max_connection": "10",
		// development or production
		"mode": "production"
	}
};
