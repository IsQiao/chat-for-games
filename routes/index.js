var express = require('express');
    router = express.Router();
    cookieParser = require('cookie-parser');

router.use(cookieParser());

router.get('/', (req, res) => {
    var token = req.cookies.token;
    if (token) {
      jwt.verify(token, app.get('secretKey'), (err, decoded) => {
        if (err) {
          res.clearCookie('token');
          return res.redirect('/signin');
        } else {
          req.decoded = decoded;
          return res.render('index.html');
        }
      });
    } else {
      return res.redirect('/signin');
    }
});

module.exports = router;
