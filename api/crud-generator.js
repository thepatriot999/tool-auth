const Boom = require( 'boom' );
const mongoose = require( 'mongoose' );
const dbManifest = require( '../config/database' );
const config = require( '../config/config' );

function generateCRUDRoutes ( model ) {
	const modelName = model.name.toLowerCase();

	return [
		{
			'method' : 'GET',
			'path' : '/' +  modelName,
			'config' : {
				handler : function ( request, reply ) {
					var Model  = request.server.plugins[ 'crud-generator' ][ 'models' ][ modelName ];
					var search = Model.find( function ( err, searchResults ) {
						if ( err ) {
							return reply( Boom.badRequest( 'Something went wrong.', err ) );
						}

						return reply( searchResults );
					} );
				}
			}
		},
		{
			'method' : 'GET',
			'path' : '/' +  modelName + '/{id}',
			'config' : {
				handler : function ( request, reply ) {
					var Model  = request.server.plugins[ 'crud-generator' ][ 'models' ][ modelName ];
					var search = Model.findById( request.params.id, function ( err, searchResults ) {
						if ( err ) {
							return reply( Boom.badRequest( 'Something went wrong.', err ) );
						}

						return reply( searchResults );
					} );
				}
			}
		},
		{
			'method' : 'POST',
			'path' : '/' +  modelName,
			'config' : {
				'handler' : function ( request, reply ) {
					var Model  = request.server.plugins[ 'crud-generator' ][ 'models' ][ modelName ];
					var obj = new Model( request.payload );

					obj.save( function ( err, saved ) {
						if ( err ) {
							return reply( Boom.badRequest( 'Something went wrong.', err ) );
						}

						return reply( saved );
					} );
				},
				'validate' : model.validation
			}
		},
		{
			'method' : 'PUT',
			'path' : '/' +  modelName + '/{id}',
			'config' : {
				handler : function ( request, reply ) {
					var Model  = request.server.plugins[ 'crud-generator' ][ 'models' ][ modelName ];

					Model.update( { _id : request.params.id }, { $set : request.payload }, function ( err ) {
						if ( err ) {
							return reply( Boom.badRequest( 'Something went wrong.', err ) );
						}

						return reply( { 'status' : 'Data updated.' } );
					} );
				},
				'validate' : model.validation
			}
		},
		{
			'method' : 'DELETE',
			'path' : '/' +  modelName + '/{id}',
			'config' : {
				handler : function ( request, reply ) {
					var Model  = request.server.plugins[ 'crud-generator' ][ 'models' ][ modelName ];

					Model.remove( { _id : request.params.id }, function ( err ) {
						if ( err ) {
							return reply( Boom.badRequest( 'Something went wrong.', err ) );
						}

						return reply( { 'status' : 'Data removed.' } );
					} );

				}
			}
		}
	];
}

exports.register = function ( plugin, option, next ) {
	mongoose.connect( config.database.url );

	var db = mongoose.connection;

	db.on( 'connected', function () {
		plugin.expose( 'mongoose', mongoose );
		plugin.expose( 'db', db );

		var models =  {};

		if ( dbManifest.models ) {
			dbManifest.models.forEach( function ( model ) {
				var Model = mongoose.model( model.name, model.schema );

				models[ model.name.toLowerCase() ] = Model;

				var routes = generateCRUDRoutes( model );

				plugin.route( routes );
			} );
		}

		/*
		 * Expose model as plugin
		 */
		plugin.expose( 'models', models );
	} );

	next();
};

exports.register.attributes = {
	'name' : 'crud-generator'
};
