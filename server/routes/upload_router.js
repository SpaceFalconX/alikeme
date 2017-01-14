const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
  destination: 'profile_pictures/', //-destination folder
  filename: (req, file, cb) => {
    cb(null, username + '.jpg');
  }
});
const upload = multer({ storage }).any('username');

const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'isaacxpreston',
  api_key: '297943853264417',
  api_secret: 'LqbCuQRKxRksxHiqdf_M5GO2oZk'
})

let username;

router.post('/setUserName', (req, res) => {
  username = req.body.username
  res.sendStatus(200)
})

router.post('/uploadProfilePicture', upload, (req, res) => {
  cloudinary.v2.uploader.upload('profile_pictures/' + username + '.jpg', {public_id: username, invalidate: true}, function(err, result) {
    //console.log("it broke?", err, result)
    var testImg = cloudinary.image(username + '.jpg')
    res.send(testImg)
  });
})

module.exports = router