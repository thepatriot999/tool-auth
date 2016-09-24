const Tennants = require( './handlers/tennants' );
const Authentication = require( './handlers/auth' );

exports.register = function ( plugin, option, next ) {
	/*
	 * Routes will registered here
	 */
	plugin.route( [
		{
			'method' : 'POST',
			'path'   : '/auth',
			'config' : Authentication.authenticate
		},
		...Tennants
	] );

	next();
};

exports.register.attributes = {
	'name' : 'api'
};
