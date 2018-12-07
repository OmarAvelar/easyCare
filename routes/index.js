const express = require('express');
 const router  = express.Router();
 const Post = require('../models/Post');

  //GET home page. 
 router.get('/', (req, res, next) => {
   const user = req.user;
   Post.find()
   .populate('creatorId')
   .then(posts => {
     res.render('index', { title: 'Docs', user, posts })
   })
   .catch(e => console.log(e))
 });

// router.get('/', (req, res)=>{
//   res.send('looool')
// })
 module.exports = router;