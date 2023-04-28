const jwt = require("jsonwebtoken");

const autenticar = async (req, res, next) => {
    try {
        //obtener el token de la cabecera de autorizacion
        const token = await req.headers.authorization.split(" ")[1];

        //revisar si coincide el token
        const tokenCheck = await jwt.verify(token, "RANDOM-TOKEN");

        //onbtener datos del usuario logueado
        const usuario = await tokenCheck;

        //Pasar el usuario hacia el endpoint
        req.usuario = usuario;

        next();
    } catch (error) {
        res.status(401).json({
            error: new Error("Peticion invalida")
        });
    }
};

module.exports = autenticar;