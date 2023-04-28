const mongoose = require('mongoose');

const dbConnection = async () => {

    try{
        await mongoose.connect('mongodb://127.0.0.1/encuestasdb', {
        	useNewUrlParser: true
        });

        console.log('Se ha logrado conectar con la base de datos');
    }
    catch(err) {
        console.log(err);
        throw new Error('Error al conectar a base de datos');
    }


}

module.exports = dbConnection;