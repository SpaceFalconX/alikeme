const express = require('express');
const http = require('http');
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

    res.sendStatus(200)
  });
})

router.post('/fetchProfilePicture', (req, res) => {
  //TODO - DEBUG so works in all cases
  // let username = req.body.username
  // //console.log('USERNAME', username)
  // options = {method: 'HEAD', host: 'res.cloudinary.com', port: 80, path: '/isaacxpreston/image/upload/' + username + '.jpg'}
  // req = http.request(options, function(r) {
  //     let validImage = !r.headers.status
  //     if (validImage) {
  //       //console.log("it's valid")
  //       res.send('http://res.cloudinary.com/isaacxpreston/image/upload/' + username + '.jpg')
  //     } else {
  //       res.send("http://www.topcareer.jp/inter_blog/wp-content/uploads/100_100_empty.gif")
  //     }
  // });
  // req.end()
  res.send("http://www.topcareer.jp/inter_blog/wp-content/uploads/100_100_empty.gif")
})

module.exports = router