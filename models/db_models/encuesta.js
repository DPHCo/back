const { Schema, model } = require('mongoose');

const encuestaSchema = new Schema({
	titulo: {
		type: String
	},
	idCreador: {
		type: String
	},
	campos: [{
		type: {
			type: String
		},
		nombre: {
			type: String
		},
		opciones: [{
			type: String
		}]
	}]
})

module.exports = model('EncuestasUser', encuestaSchema);
