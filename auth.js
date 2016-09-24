exports.register = function ( plugin, options, next ) {
	var users = [
		{
			'name' : 'jeshua',
			'id' : '1'
		}
	];

	plugin.auth.strategy( 'jwt', 'jwt', {
		'key' : 'somevalue',
		'verifyOptions' : {
			'algorithms' : [ 'HS256' ]
		},
		'validateFunc' : function ( decoded, request, callback ) {
			if ( decoded.id ) {
				if ( users.find( function ( user ) {
					return user.id === decoded.id;
				} ) ) {
					return callback( null, true );
				}
			}
			return callback( null, false );
		}
	} );

	next();
};

exports.register.attributes = {
	'name' : 'auth'
};
