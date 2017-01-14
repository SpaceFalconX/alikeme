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
  console.log('FETCH REQ BODY', req.body.username)
  options = {method: 'HEAD', host: 'res.cloudinary.com', port: 80, path: '/isaacxpreston/image/upload/' + req.body.username + '.jpg'},
  req = http.request(options, function(r) {
      console.log('HEADERS', JSON.stringify(r.headers));
      let temp = !r.headers.status
      res.send(temp)
  });
  req.end()
})

module.exports = router