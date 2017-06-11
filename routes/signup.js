var express = require('express');
    router = express.Router();
    User = require('../models/user');

router.get('/signup', (req, res) => {
  res.render('signup.html');
});

router.post('/signup', function(req, res) {
    var u = new User({
      email: req.body.email,
      password: req.body.password
    });

    u.save((err) => {
      if(err) throw err;
      console.log('Se guardó el usario');
    });

    res.redirect('/signin');
});

module.exports = router;
