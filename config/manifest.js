const manifest = {
	connections : [
		{
			port   : 8080,
			labels : [ 'dev' ],
			routes : {
				cors : true
			}
		}
	],
	registrations : [
		{
			plugin : 'hapi-auth-jwt2'
		},
		{
			plugin : './auth'
		},
		{
			plugin  : './api',
			options : {
				routes : {
					prefix : '/api'
				}
			}
		}
	]
};

module.exports = manifest;
