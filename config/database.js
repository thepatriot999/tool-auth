const Joi = require( 'joi' );

const database = {
	models : [
		{
			name       : 'Tennant',
			schema     : {
				'name' : String,
				'age'  : Number
			},
			validation : {
				payload : {
					name : Joi.string().required(),
					age  : Joi.number().required()
				}
			}
		}
	]
};

module.exports = database;
