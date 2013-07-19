module.exports = {
	"logging": {
		"log4js": {
			"appenders": [
				{
					"type": "file",
					"filename": "/log/photo-gallery/app.log",
					"maxLogSize": 10000000,
					"backups": 10
				}
			]
		}
	},
	"mongoDB": {
		"host": "10.34.130.130",
		"port": "27017",
		"dbName": "attendee",
		"max_connection": "10",
		// development or production
		"mode": "production"
	}
};
