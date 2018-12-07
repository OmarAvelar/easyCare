const express = require('express');
 const path = require('path');
 const favicon = require('serve-favicon');
 const logger = require('morgan');
 const cookieParser = require('cookie-parser');
 const bodyParser = require('body-parser');
 //const passport = require('passport');
 const LocalStrategy = require('passport-local').Strategy;
 const User = require('./models/User');
 //const bcrypt = require('bcrypt');
 const session = require('express-session');
 const MongoStore = require('connect-mongo')(session);
 const mongoose = require('mongoose');
 const flash = require('connect-flash');
 const hbs = require('hbs');
 const welcomeMail = require("./helpers/mailer").welcomeMail;
 const passport = require("./helpers/passport")


 //DBlol
 mongoose.connect(process.env.DB);

 const app = express();
 
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'hbs');
 
 app.use(session({
   secret: 'doctors',
   resave: false,
   saveUninitialized: true,
   store: new MongoStore( { mongooseConnection: mongoose.connection })
 }))
 


//passport
app.use(
  session({
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60
    }),
    secret: "s3cr3t",
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());



 app.use(flash());
 app.use(passport.initialize());
 app.use(passport.session());
 app.use(logger('dev'));
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(cookieParser());
 app.use(express.static(path.join(__dirname, 'public')));






 const index = require('./routes/index');
 const authRoutes = require('./routes/authentication');
 const post = require('./routes/post');
 const directorio = require('./routes/directorio');
 app.use('/', index);
 app.use('/', authRoutes);
 app.use('/', post);
 app.use('/', directorio);

 

 // catch 404 and forward to error handler
 app.use((req, res, next) => {
   const err = new Error('Not Found');
   err.status = 404;
   next(err);
 });
 
 // error handler
 app.use((err, req, res, next) => {
   // set locals, only providing error in development
   res.locals.message = err.message;
   res.locals.error = req.app.get('env') === 'development' ? err : {};
 
   // render the error page
   res.status(err.status || 500);
   res.render('error');
 });
 
 module.exports = app;