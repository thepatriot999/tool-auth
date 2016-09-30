var jwt = require( 'jsonwebtoken' );
var boom = require( 'boom' );
var Joi = require( 'joi' );

module.exports.authenticate = {
	handler : function ( request, reply ) {
		var token = jwt.sign( request.payload, 'a9282hc7263cb365d28f83e' );

		if ( request.payload.username === 'someincredibleuser' && request.payload.password === 'somepassword' ) {
			return reply( token );
		}
		reply( boom.badRequest( 'Invalid credentials provided.' ) );
	},
	auth 	 : false,
	validate : {
		payload : {
			username : Joi.string().required(),
			password : Joi.string().required()
		}
	}
}

module.exports.validateAccess = {
	handler : function ( request, reply ) {
		return reply( 'access granted' );
	},
	auth : 'jwt'
};
