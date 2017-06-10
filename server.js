var express = require('express');
    app = express();
    ejs = require('ejs').renderFile;
    path = require('path');
    bodyParser = require('body-parser');
    jwt = require('jsonwebtoken');
    mongoose = require('mongoose');
    config = require('./config');
    User = require('./models/user');

const port = process.env.PORT || 3000;
mongoose.connect(config.database);
app.set('secretKey', config.secret);

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', ejs);

app.get('/', (req, res) => {

  res.render('home.html');
});
app.get('/signup', (req, res) => {
  res.render('signup.html');
});
app.get('/signin', (req, res) => {
  res.render('signin.html');
});
app.post('/signup', function(req, res) {
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
app.post('/signin', function(req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) throw err;
    else if (user && user.password == req.body.password) {
      var token = jwt.sign(user, app.get('secretKey'), {
        expiresIn: 60 * 60 * 24
      });
      res.redirect('/');
    }
  });
});

app.listen(port, (err) => {
  if(err) throw err;
  console.log('Server is open. Listening on port ' + port);
});
