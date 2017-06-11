var express = require('express');
    app = express();
    ejs = require('ejs').renderFile;
    path = require('path');
    bodyParser = require('body-parser');
    jwt = require('jsonwebtoken');
    mongoose = require('mongoose');
    config = require('./config');
    index = require('./routes/index');
    signin = require('./routes/signin');
    signup = require('./routes/signup');

//port config
const port = process.env.PORT || 3000;

//database and json web tokens config
mongoose.connect(config.database);
app.set('secretKey', config.secret);

//static files config
app.use(express.static(path.join(__dirname, 'public')));

//body parser config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//views config
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', ejs);

//routes config
app.use(index);
app.use(signin);
app.use(signup);

app.listen(port, (err) => {
  if(err) throw err;
  console.log('Server is open. Listening on port ' + port);
});
