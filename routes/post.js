const express = require('express');
 const router = express.Router();
 const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
 const multer = require('multer');
 const upload = multer({ dest: './public/uploads/' });
 const Post = require('../models/Post');
 const User = require("../models/User");



//  router.get("/review/:id", (req, res, next) => {
//     const { id } = req.params;
//     User.findById(id)
//       .populate("user")
//       .then(user => {
//         Post.find({ user: user._id })
//           .populate("user")
//           .then(posts => {
//             let isOwner = false;
//             if (req.user._id == user.user._id) isOwner = true;
//             res.render("users/detail", {
//               user: user,
//               owner: isOwner,
//               comments: comments
//             });
//           })
//           .catch(e => {
//             console.log(e);
//           });
//       })
//       .catch("/review");
//   });







//  router.get('/new-post', ensureLoggedIn('/login'), (req, res) => {
//     res.render('new-post');
// });

// router.post('/new-post', ensureLoggedIn('/login'), (req,res) => {
//     const {content} = req.body;
//     const newPost = new Post({
//         content,
//         creatorId: req.user._id,
//     });
//     newPost.save()
//     .then(() => res.redirect('/profile/:username'));

// });





// router.get('/review/', (req, res) => {
//     const {id} = req.params
//     User.findById(id)
//     .then(user =>{
//        const paciente = (req.user.role === "Paciente") ? true : false
//        res.render('review', {paciente, user});
//     })
//   });
  
  
  
//   router.get('/profile/:username', (req, res) => {
//     const {username} = req.params
//     const paciente = (req.user.role === "Paciente") ? true : false
//     User.findOne({username})
//     .then(foundUser=>{
//       res.render("authentication/profile", {user:foundUser})
//       .catch(e=>{
//         console.log(e)
//       })
//     })
//        res.render('review', {paciente, user});
//     });
  

//  router.get('/review', ensureLoggedIn('/login'), (req, res) => {
//      res.render('review');
//  });

//  router.post('/review', ensureLoggedIn('/login'), (req,res) => {
//      const {content} = req.body;
    
//      const newPost = new Post({
//          content,
//          creatorId: req.user._id,
      
//      });
//      newPost.save()
//      .then(() => res.redirect('/profile/'));

//  });


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