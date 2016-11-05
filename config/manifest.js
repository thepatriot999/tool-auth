const manifest = {
	connections : [
		{
			port   : process.env.PORT || 80,
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
