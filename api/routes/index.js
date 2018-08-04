var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlProj = require('../controllers/project');


// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//project
router.post('/create', ctrlProj.create);
router.put('/update', ctrlProj.update);
router.get('/read', ctrlProj.read);
router.delete('/delete', ctrlProj.delete);




module.exports = router;
