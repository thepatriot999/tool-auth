var handler = require( './handler' );

module.exports = [
	{
		'method' : 'PUT',
		'path'   : '/tennant/bills/{id}',
		'config' : handler.addBill
	}
];
