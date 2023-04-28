const { Router } = require('express');
const Usuario = require('../models/db_models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validar = require('../middlewares/usuario');

const router = new Router();

router.post('/registro', (req, res) => {
    const { nombre, password } = req.body;

    if(nombre === ''){
        res.json({ error: 'Hubo un error en el registro' });
    }
    else{
      bcrypt.hash(password, 10).then( hashedPass => {
        const newUser = new Usuario({
            nombre,
            password: hashedPass
        });
        newUser.save().then( result => {
            res.status(201).json({
                messagge: 'Usuario registrado',
                result
            })
        }).catch( err => {
            res.status(500).json({
                error: 'Error al registrar al usuario',
                err
            });
        });
        
      })  
    }
    
});

router.post('/login', (req, res) => {
  const { nombre, password } = req.body;
  Usuario.findOne({nombre}).then( (user) => {
    bcrypt.compare( password, user.password )
    .then( (checkPass) => {
      if(!checkPass){
        return res.status(400).json({
          message: 'No coinciden las credenciales',
          error
        });
      }

      const token = jwt.sign({
        idUsuario: user._id,
        nombreUsuario: user.nombre
      },
      "RANDOM-TOKEN",
      { expiresIn: "24h" }
      );
      res.status(200).json({
        message: 'Inicio de sesion correcto',
        idUsuario: user._id,
        nombre: user.nombre,
        token
      });
    })
    .catch( err => {
      res.status(400).json({
        message: 'No coinciden las credenciales',
        err
      });
    });
  })
  .catch( err => {
    res.status(404).json({
      message: 'Usuario no encontrado',
      err
    });
  });
});


module.exports = router;