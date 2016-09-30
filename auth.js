exports.register = function ( plugin, options, next ) {
	var users = [
		{
			username : 'someincredibleuser',
			password : 'somepassword'
		}
	];

	plugin.auth.strategy( 'jwt', 'jwt', {
		'key' : 'a9282hc7263cb365d28f83e',
		'verifyOptions' : {
			'algorithms' : [ 'HS256' ]
		},
		'validateFunc' : function ( decoded, request, callback ) {
			if ( decoded.id ) {
				if ( users.find( function ( user ) {
					return user.username === decoded.username && user.password === decoded.password;
				} ) ) {
					return callback( null, true );
				}
			}
			return callback( null, false );
		}
	} );

	plugin.auth.default( 'jwt' );

	next();
};

exports.register.attributes = {
	'name' : 'auth'
};
