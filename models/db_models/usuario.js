const { Schema, model } = require('mongoose');

const UsuarioModel = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: [true, 'Existe ese usuario']
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = model('Usuarios', UsuarioModel);