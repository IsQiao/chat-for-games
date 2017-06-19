var express = require('express');
    router = express.Router();
    User = require('../models/user');

router.get('/signin', (req, res) => {
  res.render('signin.html');
});

router.post('/signin', function(req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) throw err;
    if (user && user.password == req.body.password) {
      var token = jwt.sign(user, app.get('secretKey'), {
        expiresIn: 60 * 60 * 24
      });
      res.cookie('token', token);
      res.redirect('/');
    }
  });
});

module.exports = router;
