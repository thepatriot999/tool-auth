const Hapi = require( 'hapi' );
const Glue = require( 'glue' );
const manifest = require( './config/manifest.js' );

const options = {
	relativeTo : __dirname
};

Glue.compose( manifest, options, function ( err, server ) {
	if ( err ) {
		console.log( err );
		return;
	}

	server.start( function () {
		console.log( 'Server is running: ' + server.info.uri );
	} );
} );
