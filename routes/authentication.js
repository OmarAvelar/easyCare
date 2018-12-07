const express = require('express');
 const passport = require('passport');
 //const passport = require('../helpers/passport')
 const router = express.Router();
 const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
 const multer = require('multer');
 const upload = multer({ dest: './public/uploads/' });
 const Post = require('../models/Post');
 const User = require("../models/User");
 const welcomeMail = require("../helpers/mailer").welcomeMail;
 const uploadCloud = require('../helpers/cloudinary');
 let flags = true;





router.get('/login', (req, res) => {
    let flags = true

    res.render('authentication/login', { message: req.flash('error')});
});

router.post('/login', passport.authenticate('local', {
  successRedirect : '/profile/myprofile',
  failureRedirect : '/login',
  failureFlash : true,
  passReqToCallback: true
}));




router.get("/signup", (req, res, next) => {
    res.render("authentication/signup");
  });
  
  router.post("/signup", (req, res, next) => {

    const { username, email } = req.body;
    User.register(req.body, req.body.password)
      .then(user => {
        welcomeMail(username, email);
        res.redirect("/login");
      })
      .catch(error => {
        res.render("authentication/signup", { data: req.body, error });
      });
  });



 //formulairo
 router.get('/formulario/:id', (req, res) => {
    const {id} = req.params
    User.findById(id)
    .then(user =>{
       const paciente = (req.user.role === "Paciente") ? true : false
       res.render('formulario', {paciente, user});
    })

   
});

router.post('/formulario/:id', uploadCloud.single('photoURL'), (req,res) => {
   console.log('entre');
   const id = req.params.id
   let todo = {
       username: req.body.username,
       cedula: req.body.cedula,
       titulo: req.body.titulo,
       phone:  req.body.phone,
       sobremi: req.body.sobremi,
       formacion: req.body.formacion,
       //photoURL: `/uploads/${req.file.filename} `,
       photoURL: req.file.url,
       direccion: req.body.direccion,
       especialidad: req.body.especialidad,
       location: {
           type: "Point",
           coordinates: [req.body.lng, req.body.lat]
       }
   }

   User.findByIdAndUpdate(id, {$set:todo}, {new: true},null)
   .then(User=>{

       res.redirect('/profile/myprofile');
   }).catch(e=>{
       console.log(e)
   })    
});







 router.get('/profile/myprofile', (req, res) => {
     const username = req.user.username
    const paciente = (req.user.role === "Paciente") ? true : false
    let flag = true
    Post.find({creatorId: req.user._id})
     .then(posts => res.render('authentication/profile', 
     {user : req.user, posts, paciente, flags}))
     .catch(e => console.log(e));
 });


 router.get("/profile/:username", (req, res, next) => {
    const { username } = req.params;
    User.findOne({username})
      .populate("user")
      .then(foundUser => {
        Post.find({ })
          .populate("user")
          .then(post => {
            res.render("authentication/profile", {
              user: foundUser,
              post: post
            });
          })
          .catch(e => {
            console.log(e);
          });
      })
      .catch(e => e);
  });


 router.post('/profile/:username/post',(req, res, next)=>{
    const {username} = req.params
   
    Post.create(req.body)
      .then(post=>{
        res.redirect(`/profile/${username}`)
      }).catch(e=>{
        console.log(e)
      })
      .catch(e => {
        console.log(e);
      });
  });











 router.get('/logout', (req, res) => {
     req.logout();
     let flags = false;
     res.redirect('/');
 });





 
 module.exports = router;