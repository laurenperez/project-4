var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//SAVE to Favorites
router.post('/favorite', function(req,res,next){
  console.log(req.body.user)
  console.log(req.body.name)
  User.findOneAndUpdate(
    { "_id": req.body.user.id},{$push:{favorites:req.body.name}},{new:true},
    function(err,user) {
        if(err){
          console.log(err)
        }
        user.save();
        res.send({favorites: user.favorites});
    });
});

// //DELETE EXAMPLE
// router.post('/delete', function(req,res,next){
//   let src = req.body.src;
//   let subDoc = '';
//   if(req.body.editOrOriginal === 'editedData'){
//     subDoc = 'editedImages'
//   }else{
//     subDoc = 'images'
//   }
//     User.findOne({'_id': req.body.user.id},function(err, user){
//           user[subDoc].splice(req.body.index, 1);
//           user.save()
//           if(err){
//             console.log(err);
//           }
//         res.send({images: user.images, edited:user.editedImages});
//       })
// });

//GET
router.post('/favoriteList', function(req,res,next){
  User.findOne({ "_id": req.body.user.id}).
  exec(function (err, user) {
    if (err) console.log(err);
    res.send({favorites: user.favorites});
  });
})



module.exports = router;
