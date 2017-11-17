var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});





////////////////////////////////////////////////////
//EVERYTHING IN HERE IS EXPERIMENTAL

//new data saved
// router.post('/new', function(req,res,next){
//   User.findOneAndUpdate(
//     { "_id": req.body.user.id},{$push:{images:req.body.src}},{new:true},
//     function(err,user) {
//         if(err){
//           console.log(err)
//         }
//         user.save();
//         res.send(user);
//     });
// });

router.post('/favorites', function(req,res,next){
  console.log("Im in the route" , req)
  User.findOneAndUpdate(
    { "_id": req.body.user.id},{$push:{favorites:req.body.name}},{new:true},
    function(err,user) {
        if(err){
          console.log(error.response)
        }
        user.save();
        res.send(user);
    });
});



//
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
//
//
// //GET
// router.post('/grid', function(req,res,next){
//   User.findOne({ "_id": req.body.user.id}).
//   exec(function (err, user) {
//     if (err) console.log(err);
//     res.send({images: user.images, edited: user.editedImages});
//   });
// })

//////////////////////////////////////////////////////



module.exports = router;
