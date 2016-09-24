const Boom = require( 'boom' );

module.exports.addBill = {
	handler : function ( request, reply ) {
		var Model  = request.server.plugins[ 'crud-generator' ][ 'models' ][ 'tennant' ];

		Model.findOne( { 'bills.due_date' : { $gte : request.payload.due_date } }, function ( err, bill ) {
			if ( err ) {
				return reply( Boom.badRequest( 'Something went wrong.', err ) );
			} else if ( bill ) {
				return reply( Boom.badRequest( 'You have already created a bill with a due date earlier than the one you specified.', err ) );
			}

			Model.update( { _id : request.params.id }, { $push : {
				'bills' : request.payload
			} }, function ( err ) {
				if ( err ) {
					return reply( Boom.badRequest( 'Something went wrong.', err ) );
				}

				return reply( { 'status' : 'Bill added to tennant.' } );
			} );
		} );
	}
};

