const express = require('express');
 const router = express.Router();
 const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
 const multer = require('multer');
 const upload = multer({ dest: './public/uploads/' });
 const Post = require('../models/Post');
 const User = require("../models/User");




 router.get('/directorio', (req, res) => {
  res.render('directorio');
});

router.post('/directorio', (req, res)=>{
  const titulo = req.body.titulo
  const especialidad = req.body.especialidad
  User.find({$and:[{titulo:titulo}, {especialidad:especialidad}]})
  .then(users =>{
    res.render('directorio', {users})
  }).catch(e=>{
    console.log(e)
  })
})




// router.get('/review/', (req, res) => {
//   const {id} = req.params
//   User.findById(id)
//   .then(user =>{
//      const paciente = (req.user.role === "Paciente") ? true : false
//      res.render('review', {paciente, user});
//   })
// });



// router.get('/profile/:username', (req, res) => {
//   const {username} = req.params
//   const paciente = (req.user.role === "Paciente") ? true : false
//   User.findOne({username})
//   .then(foundUser=>{
//     res.render("authentication/profile", {user:foundUser})
//     .catch(e=>{
//       console.log(e)
//     })
//   })
//      res.render('review', {paciente, user});
//   });


 module.exports = router