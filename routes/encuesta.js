const { Router } = require('express');
const Encuesta = require('../models/db_models/encuesta');
const Respuesta = require('../models/db_models/respuesta');

const router = new Router();

router.post('/agregar', (req, res) => {
    const { campos, idCreador, titulo } = req.body;
    
    
    const newEncuesta = new Encuesta({
        titulo,
        idCreador,
        campos
    });

    newEncuesta.save().then( result => {
        console.log(newEncuesta);
        res.status(200).json({
            message: 'Encuesta agregada'
        })
    } )
    .catch( err =>{
        res.status(404).json({
            err
        })
    } )
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const encuestas_user = await Encuesta.find({ idCreador: id });
        res.status(200).json(encuestas_user);
    } catch (error) {
        res.staus(500).json({
            error
        })
    }
});

router.delete('/del', async (req, res) => {
    const body = req.query;
    console.log(body);
    try {
        const encuesta_borrar = await Encuesta.findOneAndDelete({ _id: body._id });
        const erase = await Respuesta.findOneAndDelete({ encuestaId: encuesta_borrar._id });
        res.status(200).json({
            message: 'ok'
        })

    } catch (error) {
        res.status(404).josn({
          error  
        })
    }
})

router.get('/obtain/all', async (req, res) => {
    try {
        const encuestas = await Encuesta.find();
        res.status(200).json(encuestas);
    } catch (error) {
        res.status(500).json({
            error
        })
    }
});

router.get('/respuesta/all', async (req, res) => {
    try {
        const respuestas = await Respuesta.find();
        res.status(200).json(respuestas);
    } catch (error) {
        res.status(500).json({
            error
        })
    }
});

router.post('/respuesta', async (req, res) => {
    const datos = req.body;

    try {
        const respEncuesta = await Respuesta.findOne({ encuestaId: datos.encuestaId });
        if(respEncuesta){
            //actualizar
            datos.respuestas.forEach( newRespuesta => {
                const exist = respEncuesta.respuestas.find( resp => resp.campoId === newRespuesta.campoId );
                if(exist){
                    respEncuesta.usuarioId.push(datos.usuarioId);
                    exist.resp.push(newRespuesta.respuesta);
                }
                else{
                    respEncuesta.usuarioId.push(datos.usuarioId);
                    respEncuesta.respuestas.push({
                        campoId: newRespuesta.campoId,
                        resp: [newRespuesta.respuesta]
                    });
                }
            });
            await respEncuesta.save();
        }
        else{
            const newResp = new Respuesta({
                encuestaId: datos.encuestaId,
                usuarioId: [datos.usuarioId],
                respuestas: datos.respuestas.map( response => ({
                    campoId: response.campoId,
                    resp: [response.respuesta]
                })),
            });
            await newResp.save();
        }
        res.status(201).json({
            message: 'Respuesta creada'
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
})

module.exports = router;