const express = require('express');
const dotenv = require('dotenv');
dotenv.config({
  path: './.env'
})
const port = process.env.PORT || 3000;
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const session = require('express-session')
const passport = require('./config/passport')
const LocalStrategy = require('passport-local')
const mongoStore = require('connect-mongo')

// lets pass the cookie parser to the MiddleWare
app.use(cookieParser());
require('./config/db')

//log request
app.use(morgan('tiny'))

//serving static files
app.use(express.static('./assets'));

app.set('view engine', 'ejs');
app.set('views', 'views');

//parse request
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//session cookie
app.use(session({
  name: 'Enbiit',
  secret: process.env.SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: (1000*60*100)
  },
  store: mongoStore.create(
    {
      mongoUrl: process.env.DB,
      autoRemove: 'disabled'
    },
    function(err){
      console.log(err || "Connected to Mongoose")
    }
  )
}));

app.use(passport.initialize())
app.use(passport.session())
app.use(passport.setAuthenticatedUser)

app.use('/', require('./routes/router'));
app.use('/uploads', express.static('uploads'))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
