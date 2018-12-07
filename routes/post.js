const express = require('express');
 const router = express.Router();
 const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
 const multer = require('multer');
 const upload = multer({ dest: './public/uploads/' });
 const Post = require('../models/Post');
 const User = require("../models/User");




router.get('/map', ensureLoggedIn('/login'), (req, res) => {
    const paciente = (req.user.role === "Paciente") ? true : false
     Post.find({creatorId: req.user._id})
     .then(posts => res.render('map', 
     {user : req.user, posts, paciente}))
     .catch(e => console.log(e));
 });




router.post('/routes/post/:id', upload.single("photoURL"), (req, res) => {
    const {id} = req.params
    const photoURL = req.file.url
    User.findByIdAndUpdate(id, {$set:{photoURL:photoURL}})
    .then(User=>{
        res.redirect('/profile');
    }).catch(e=>{
        console.log(e)
    })    
});


 module.exports = router;