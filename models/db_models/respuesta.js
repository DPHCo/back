const { Schema, model } = require('mongoose');

const respuestaSchema = new Schema({
	encuestaId: {
		type: String
	},
    usuarioId: [{
        type: String
    }],
	respuestas: [{
        campoId: {
            type: String
        },
        resp: [{
            type: Schema.Types.Mixed
        }]
    }]
	
})

module.exports = model('Respuesta', respuestaSchema);
