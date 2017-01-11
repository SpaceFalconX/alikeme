const express = require('express');
const del = require('del');
const multer = require('multer');
const router = express.Router();
let username;

const storage = multer.diskStorage({
  destination: 'profile_pictures/', //-destination folder
  filename: (req, file, cb) => {
    cb(null, username + '.jpg');
  }
});

const upload = multer({ storage }).any();
router.post('/setUserName', (req, res) => {
  username = req.body.username
  res.sendStatus(200)
})

router.post('/uploadProfilePicture', upload, (req, res) => {
  //console.log("REQ FROM ROUTE", req.body.username)
  res.sendStatus(200)
})

module.exports = router