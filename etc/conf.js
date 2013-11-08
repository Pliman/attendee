module.exports = {
	"application": {
		"rebuildDataTime": {
			hour: 23,
			minute: 50,
			dayOfWeek: 4
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
		//"host": "10.34.135.159",
		"host": "192.168.1.100",
		"port": "27017",
		"dbName": "attendee",
		"max_connection": "10",
		// development or production
		"mode": "production"
	}
};
