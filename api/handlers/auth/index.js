var jwt = require( 'jsonwebtoken' );

module.exports.authenticate = {
	handler : function ( req, reply ) {
		var token = jwt.sign( req.payload, 'secretkey' );
		reply( token );
	}
}
